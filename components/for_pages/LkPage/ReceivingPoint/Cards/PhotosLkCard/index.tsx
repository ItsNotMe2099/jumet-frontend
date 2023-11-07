//import styles from './index.module.scss'
import { useState} from 'react'
import FormFooter from '@/components/ui/FormFooter'
import {useReceivingPointOwnerContext} from '@/context/receiving_point_owner_state'
import {DeepPartial} from '@/types/types'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'
import ReceivingPointInfoEditCard from '@/components/for_pages/LkPage/ReceivingPoint/ReceivingPointInfoEditCard'
import ReceivingPointPhotosForm from '@/components/for_pages/LkPage/ReceivingPoint/Forms/ReceivingPointPhotosForm'
import Button from '@/components/ui/Button'
import styles from '@/components/for_pages/LkPage/ReceivingPoint/Forms/ReceivingPointPhotosForm/index.module.scss'


interface Props {
}

export default function PhotosLkCard(props: Props) {
  const receivingPointContext = useReceivingPointOwnerContext()
  const [loading, setLoading] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const handleSubmit = async (data: DeepPartial<IReceivingPoint>) => {
    setLoading(true)
    console.log('handleSubmit11')
    await receivingPointContext.editRequest(data)
    setIsEdit(false)
    setLoading(false)
  }
  if(!receivingPointContext.receivingPoint){
    return null
  }
  return (
    <ReceivingPointInfoEditCard title='Фотографии пункта приема'
                                isEdit={true}
                                onSetIsEdit={setIsEdit}
                                form={<ReceivingPointPhotosForm  footer={(receivingPointContext.receivingPoint?.photos?.length ?? 0)> 0 ? <FormFooter onBack={() => setIsEdit(false)} spinner={loading} />  :  <div><Button type='submit' className={styles.btn} color='blue' styleType='large'>
                                  Добавить
                                </Button></div>}  receivingPoint={receivingPointContext.receivingPoint} onSubmit={handleSubmit}/>}>

    </ReceivingPointInfoEditCard>
  )
}
