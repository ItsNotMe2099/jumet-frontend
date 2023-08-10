import styles from 'components/for_pages/LkPage/ReceivingPoint/Forms/ReceivingPointAddressForm/index.module.scss'
import {FieldArray, Form, FormikProvider, useFormik} from 'formik'
import Validator from '@/utils/validator'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'
import {ReactElement} from 'react'
import {DeepPartial} from '@/types/types'
import InputField from '@/components/fields/InputField'
import Button from '@/components/ui/Button'
import CirclePlusSvg from '@/components/svg/CirclePlusSvg'
import {colors} from '@/styles/variables'
import SelectField from '@/components/fields/SelectField'
import {EmployeeRole} from '@/data/enum/EmployeeRole'

interface IFormData {

  users: { name: string | null, email: string | null, initialRole: EmployeeRole }[]
}

interface Props {
  receivingPoint?: IReceivingPoint | null
  footer: ReactElement
  onSubmit: (data: DeepPartial<IReceivingPoint>) => Promise<void>
}

export default function ReceivingPointUsersForm(props: Props) {
  const handleSubmit = async (data: IFormData) => {
    await props.onSubmit(data as DeepPartial<IReceivingPoint>)
  }

  const initialValues: IFormData = {
    users: [
      {name: null, email: null, initialRole: EmployeeRole.ReceivingPointManager}
    ]
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })

  return (
    <FormikProvider value={formik}>
      <Form className={styles.root}>
        <FieldArray name='users'>
          {arrayHelpers => (
            <>
              {formik.values.users.map((item, index) => (
                <>
                  <InputField
                    label={'Имя и фамилия сотрудника'}
                    name={`users[${index}].name`}
                    validate={Validator.required}
                  />
                  <InputField
                    label={'Email сотрудника'}
                    name={`users[${index}].email`}
                    validate={Validator.combine([Validator.required, Validator.email])}
                  />
                  <SelectField<EmployeeRole>
                    options={[
                      {label: 'Администратор пункта приема', value: EmployeeRole.ReceivingPointAdmin},
                      {label: 'Менеджер пункта приема', value: EmployeeRole.ReceivingPointManager}
                    ]}
                    label={'Роль сотрудника'}
                    name={`users[${index}].initialRole`}
                    validate={Validator.required}
                  />
                </>))}
              <Button onClick={() => arrayHelpers.push({name: null, email: null, initialRole: EmployeeRole.ReceivingPointManager})} type='button' className={styles.add}
                      styleType='large' color='grey'>
                <CirclePlusSvg color={colors.blue500}/>
                Добавить еще сотрудника
              </Button>
            </>
          )}
        </FieldArray>
        {props.footer}
      </Form>
    </FormikProvider>
  )
}
