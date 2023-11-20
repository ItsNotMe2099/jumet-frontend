import styles from './index.module.scss'
import ModalLayout from 'components/layout/Modal/ModalLayout'
import {useAppContext} from '@/context/state'
import ModalBody from '@/components/layout/Modal/ModalBody'
import { EmployeeFormModalArguments} from '@/types/modal_arguments'
import ModalHeader from '@/components/layout/Modal/ModalHeader'
import {Nullable} from '@/types/types'
import {EmployeeRole} from '@/data/enum/EmployeeRole'
import EmployeeForm from '@/components/for_pages/LkPage/Forms/EmployeeForm'

interface IFormData{
  name: Nullable<string>
  email: Nullable<string>
  role: Nullable<EmployeeRole>
}
interface Props {
  isBottomSheet?: boolean
}

export default function EmployeeFormModal(props: Props) {
  const appContext = useAppContext()
  const args = appContext.modalArguments as EmployeeFormModalArguments

  return (
    <ModalLayout fixed size={'large'}>
      <ModalHeader title={'Редактировать сотрудника'}/>
      <ModalBody fixed className={styles.body}>
        <EmployeeForm employee={args.employee} />
      </ModalBody>
    </ModalLayout>
  )
}
