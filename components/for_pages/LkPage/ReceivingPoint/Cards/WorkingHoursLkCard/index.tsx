import {useReceivingPointOwnerContext} from '@/context/receiving_point_owner_state'
import {useState} from 'react'
import {DeepPartial} from '@/types/types'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'
import FormFooter from '@/components/ui/FormFooter'
import ReceivingPointWorkingHoursForm
  from '@/components/for_pages/LkPage/ReceivingPoint/Forms/ReceivingPointWorkingHoursForm'
import ReceivingPointInfoEditCard from '@/components/for_pages/LkPage/ReceivingPoint/ReceivingPointInfoEditCard'
import WorkingHoursView from '@/components/for_pages/Common/ReceivingPoint/WorkingHoursView'


interface Props {

}

export default function WorkingHoursLkCard(props: Props) {
  const receivingPointContext = useReceivingPointOwnerContext()
  const [loading, setLoading] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const handleSubmit = async (data: DeepPartial<IReceivingPoint>) => {
    setLoading(true)
    await receivingPointContext.editRequest(data)
    setIsEdit(false)
    setLoading(false)

  }
  return (
    <ReceivingPointInfoEditCard title='Режим работы' isEdit={isEdit}
                                onSetIsEdit={setIsEdit}
                                form={<ReceivingPointWorkingHoursForm
                                  footer={<FormFooter hasBack onBack={() => setIsEdit(false)} spinner={loading}/>}
                                  receivingPoint={receivingPointContext.receivingPoint} onSubmit={handleSubmit}/>}>
      {receivingPointContext.receivingPoint &&
        <WorkingHoursView receivingPoint={receivingPointContext.receivingPoint!}/>}
    </ReceivingPointInfoEditCard>
  )
}
