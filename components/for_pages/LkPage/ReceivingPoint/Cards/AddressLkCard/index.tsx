import {useReceivingPointOwnerContext} from '@/context/receiving_point_owner_state'
import ReceivingPointInfoEditCard from '@/components/for_pages/LkPage/ReceivingPoint/ReceivingPointInfoEditCard'
import {useState} from 'react'
import ReceivingPointAddressForm from '@/components/for_pages/LkPage/ReceivingPoint/Forms/ReceivingPointAddressForm'
import FormFooter from '@/components/ui/FormFooter'
import AddressView from '@/components/for_pages/Common/ReceivingPoint/AddressView'
import {DeepPartial} from '@/types/types'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'

interface Props {
}

export default function AddressLkCard(props: Props) {
  const receivingPointContext = useReceivingPointOwnerContext()
  const [loading, setLoading] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const handleSubmit = async (data: DeepPartial<IReceivingPoint>) => {
    setLoading(true)
    await receivingPointContext.editRequest(data)
    setIsEdit(false)
    setLoading(false)
  }
  console.log('isEdit', isEdit)
  return (
    <ReceivingPointInfoEditCard
      title='Адрес пункта приёма лома'
      isEdit={isEdit}
      onSetIsEdit={setIsEdit}
      form={<ReceivingPointAddressForm footer={<FormFooter hasBack onBack={() => setIsEdit(false)} spinner={loading}/>}
                                       receivingPoint={receivingPointContext.receivingPoint} onSubmit={handleSubmit}/>}
    >
      {receivingPointContext.receivingPoint && <AddressView receivingPoint={receivingPointContext.receivingPoint}/>}
    </ReceivingPointInfoEditCard>
  )
}
