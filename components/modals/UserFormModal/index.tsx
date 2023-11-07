import styles from './index.module.scss'
import ModalLayout from 'components/layout/Modal/ModalLayout'
import {useAppContext} from '@/context/state'
import ModalBody from '@/components/layout/Modal/ModalBody'
import { UserFormModalArguments} from '@/types/modal_arguments'
import ModalHeader from '@/components/layout/Modal/ModalHeader'
import { useSaleRequestOwnerContext} from '@/context/sale_request_owner_state'
import {Nullable, RequestError} from '@/types/types'
import {Form, FormikProvider, useFormik} from 'formik'
import InputField from '@/components/fields/InputField'
import Validator from '@/utils/validator'
import SelectField from '@/components/fields/SelectField'
import {EmployeeRole} from '@/data/enum/EmployeeRole'
import Button from '@/components/ui/Button'
import UserUtils from '@/utils/UserUtils'
import {useState} from 'react'
import {SnackbarType} from '@/types/enums'
import UserOwnerRepository from '@/data/repositories/UserOwnerRepository'

interface IFormData{
  name: Nullable<string>
  email: string
  role: Nullable<EmployeeRole>

}
interface Props {
  isBottomSheet?: boolean
}

export default function UserFormModal(props: Props) {
  const appContext = useAppContext()
  const saleRequestOwnerContext = useSaleRequestOwnerContext()
  const args = appContext.modalArguments as UserFormModalArguments
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (data: IFormData) => {
    setLoading(true)
    try{
      if(args.user){
        const res = await UserOwnerRepository.update(args.user.id, {employeeRole: data.role!})
        appContext.receivingPointUserUpdateState$.next({...args.receivingPointUser, user: {...args.user, ...res}})
      }else{
        }
    }catch (err) {
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }
    }
    setLoading(false)
    appContext.hideModal()
  }

  console.log('Args', args)
  const initialValues: IFormData = {
    name: args.user ? UserUtils.getName(args.user) : args.receivingPointUser.name ?? null ,
    email: args.user?.email ?? args.receivingPointUser.email ?? '',
    role: args.user?.employeeRole ?? args?.receivingPointUser?.initialRole ?? null
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })


  return (
    <ModalLayout fixed size={'large'}>
      <ModalHeader title={'Редактировать сотрудника'}/>
      <ModalBody fixed className={styles.body}>
        <FormikProvider value={formik}>
          <Form className={styles.root}>
            <InputField
              label={'Имя и фамилия сотрудника'}
              name={'name'}
              disabled={!!args.user}
              validate={Validator.required}
            />
            <InputField
              label={'Email сотрудника'}
              name={'email'}
              disabled={true}
              validate={Validator.combine([Validator.required, Validator.email])}
            />
            <SelectField<EmployeeRole>
              options={[
                {label: 'Администратор пункта приема', value: EmployeeRole.ReceivingPointAdmin},
                {label: 'Менеджер пункта приема', value: EmployeeRole.ReceivingPointManager}
              ]}
              label={'Роль сотрудника'}
              name={'role'}
              validate={Validator.required}
            />
            <div>
            <Button spinner={loading} type='submit'  styleType='large' color='blue'>
              Сохранить
            </Button>
            </div>
          </Form>
        </FormikProvider>

      </ModalBody>
    </ModalLayout>
  )
}
