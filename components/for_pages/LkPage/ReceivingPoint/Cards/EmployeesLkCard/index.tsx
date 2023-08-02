import styles from 'components/for_pages/LkPage/ReceivingPoint/Cards/EmployeesLkCard/index.module.scss'
import EmployeeCard from '@/components/for_pages/LkPage/Cards/EmployeeCard'
import {useReceivingPointOwnerContext} from '@/context/receiving_point_owner_state'
import {useEffect, useState} from 'react'
import IUser from '@/data/interfaces/IUser'
import ReceivingPointOwnerRepository from '@/data/repositories/ReceivingPointOwnerRepository'
import ContentLoader from '@/components/ui/ContentLoader'
import ReceivingPointInfoEditCard from '@/components/for_pages/LkPage/ReceivingPoint/ReceivingPointInfoEditCard'
import {DeepPartial} from '@/types/types'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'

interface Props{

}

export default function EmployeesLkCard(props: Props) {
  const receivingPointContext = useReceivingPointOwnerContext()
  const [users, setUsers] = useState<IUser[]>([])
  const [loading, setLoading] = useState<boolean>( true)
  const [editLoading, setEditLoading] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const fetch = async () => {
    const res = await ReceivingPointOwnerRepository.fetchUsers(receivingPointContext.receivingPointId)
    setUsers(res)
  }
  const handleSubmit = async (data: DeepPartial<IReceivingPoint>) => {
    setEditLoading(true)
    await receivingPointContext.editRequest(data)
    setIsEdit(false)
    setEditLoading(false)
  }
  useEffect(() => {
    fetch().then(() => setLoading(false))
  }, [receivingPointContext.receivingPointId])

  return (
    <ReceivingPointInfoEditCard title='Сотрудники'
                                isEdit={isEdit}
                                onSetIsEdit={setIsEdit}>
      <div className={styles.root}>
        {loading && <ContentLoader style={'block'}/>}
        {!loading && users.map((i, index) =>
          <EmployeeCard user={i} key={index} titleClassName={styles.title} cardLayoutClassName={styles.layout} />
        )}
      </div>

    </ReceivingPointInfoEditCard>
  )
}
