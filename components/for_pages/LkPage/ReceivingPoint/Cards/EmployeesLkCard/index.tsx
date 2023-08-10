import styles from 'components/for_pages/LkPage/ReceivingPoint/Cards/EmployeesLkCard/index.module.scss'
import EmployeeCard from '@/components/for_pages/LkPage/Cards/EmployeeCard'
import {useReceivingPointOwnerContext} from '@/context/receiving_point_owner_state'
import {useEffect, useState} from 'react'
import ContentLoader from '@/components/ui/ContentLoader'
import ReceivingPointInfoEditCard from '@/components/for_pages/LkPage/ReceivingPoint/ReceivingPointInfoEditCard'
import FormFooter from '@/components/ui/FormFooter'
import ReceivingPointUsersForm from '@/components/for_pages/LkPage/ReceivingPoint/Forms/ReceivingPointUsersForm'
import {UserListOwnerWrapper, useUserListOwnerContext} from '@/context/user_list_owner_state'
import {DeepPartial} from '@/types/types'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'
import CreateButton from '@/components/ui/Buttons/CreateButton'

interface Props{

}

const EmployeesLkCardInner = (props: Props) => {
  const receivingPointContext = useReceivingPointOwnerContext()
  const userListOwnerContext = useUserListOwnerContext()
  const [loading, setLoading] = useState<boolean>( false)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const handleSubmit = async (data: DeepPartial<IReceivingPoint>) => {
    setLoading(true)
    console.log('handleSubmit22', data)
    await receivingPointContext.editRequest(data)
    await userListOwnerContext.reFetch()
    setIsEdit(false)
    setLoading(false)
  }

  useEffect(() => {
    userListOwnerContext.reFetch()
  }, [])

  return (
    <ReceivingPointInfoEditCard title='Сотрудники'
                                isEdit={isEdit}
                                onSetIsEdit={setIsEdit}
                                editButton={<CreateButton onClick={() => setIsEdit(true)}>Добавить</CreateButton>}
                                form={<ReceivingPointUsersForm footer={<FormFooter hasBack onBack={() => setIsEdit(false)} spinner={loading} />} receivingPoint={receivingPointContext.receivingPoint}  onSubmit={handleSubmit}/>}>
      <div className={styles.root}>
        {userListOwnerContext.isLoading && <ContentLoader style={'block'}/>}
        {userListOwnerContext.data.data.map((i, index) =>
          <EmployeeCard user={i} key={index} receivingPoint={receivingPointContext.receivingPoint} />
        )}
      </div>

    </ReceivingPointInfoEditCard>
  )
}


export default function EmployeesLkCard(props: Props) {
  const receivingPointContext = useReceivingPointOwnerContext()
  return (<UserListOwnerWrapper receivingPointId={receivingPointContext.receivingPointId}>
    <EmployeesLkCardInner/>
  </UserListOwnerWrapper>)
}
