import styles from 'components/for_pages/LkPage/ReceivingPoint/Forms/ReceivingPointAddressForm/index.module.scss'
import {Form, FormikProvider, useFormik} from 'formik'
import Validator from '@/utils/validator'
import { Nullable} from '@/types/types'
import InputField from '@/components/fields/InputField'
import SelectField from '@/components/fields/SelectField'
import {EmployeeRole} from '@/data/enum/EmployeeRole'
import FormErrorScroll from '@/components/ui/FormErrorScroll'
import {EmployeeOwnerWrapper, useEmployeeOwnerContext} from '@/context/employee_owner_state'
import IEmployee from '@/data/interfaces/IEmployee'
import FormFooter from '@/components/ui/FormFooter'
import {IEmployeeCreateRequest} from '@/data/interfaces/IEmployeeCreateRequest'
import ReceivingPointMultiField from '@/components/fields/ReceivingPointMultiField'

interface IFormData {
  name: Nullable<string>
  email: Nullable<string>
  employeeRole: Nullable<EmployeeRole>
  receivingPointIds: number[]
}

interface Props {
  employee?: Nullable<IEmployee>
  hasBack?: boolean
  onBack?: (() => void) | null | undefined
}

const EmployeeFormInner = (props: Props) => {
  const employeeOwnerContext = useEmployeeOwnerContext()
  const handleSubmit = async (data: IFormData) => {

      if(props.employee) {
        await employeeOwnerContext.create(data as IEmployeeCreateRequest)
      }else{
        await employeeOwnerContext.update(data as IEmployeeCreateRequest)
      }
  }

  const initialValues: IFormData = {
    name: employeeOwnerContext.employee?.name ?? '',
    email: employeeOwnerContext.employee?.email ?? '',
    employeeRole: employeeOwnerContext.employee?.employeeRole ?? null,
    receivingPointIds: employeeOwnerContext.employee?.receivingPointUsers.map(i => i.receivingPointId) ?? []

  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })

  return (
    <FormikProvider value={formik}>
      <Form className={styles.root}>
        <FormErrorScroll formik={formik}/>

        <InputField
          label={'Имя и фамилия сотрудника'}
          name={'name'}
        />
        <InputField
          label={'Email сотрудника'}
          name={'email'}
          validate={Validator.combine([Validator.email])}
        />
        <SelectField<EmployeeRole>
          options={[
            {label: 'Администратор', value: EmployeeRole.Admin},
            {label: 'Администратор пункта приема', value: EmployeeRole.ReceivingPointAdmin},
            {label: 'Менеджер пункта приема', value: EmployeeRole.ReceivingPointManager}
          ]}
          label={'Роль сотрудника'}
          name={'employeeRole'}
        />
        <ReceivingPointMultiField name={'receivingPointIds'} label={'Пункты приема'} placeholder={'Добавить пункт приема'}/>
        <FormFooter hasBack={props.hasBack ?? false} onBack={props.onBack ?? null} spinner={employeeOwnerContext.editLoading}/>
      </Form>
    </FormikProvider>
  )
}

export default function EmployeeForm(props: Props) {
  return (<EmployeeOwnerWrapper employee={props.employee} employeeId={props.employee?.id}>
    <EmployeeFormInner/>
  </EmployeeOwnerWrapper>)
}
