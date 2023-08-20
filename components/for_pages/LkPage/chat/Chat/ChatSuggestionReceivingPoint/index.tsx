import ChatSuggestionCardLayout from '@/components/for_pages/LkPage/chat/Chat/ChatSuggestionCardLayout'
import styles from './index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import {Nullable} from '@/types/types'
import ReceivingPointField from '@/components/fields/ReceivingPointField'
import {useReceivingPointListContext} from '@/context/receiving_point_list_state'
interface IFormData{
  receivingPointId: Nullable<number>
}
interface Props {
  className?: string
}

export default function ChatSuggestionReceivingPoint(props: Props) {
  const receivingPointListContext = useReceivingPointListContext()
  const initialValues: IFormData = {
    receivingPointId: null
  }
  const handleChangeReceivingPointId = (receivingPointId: Nullable<number>) => {
    receivingPointListContext.setCurrentReceivingPointId(receivingPointId)
  }
  const handleSubmit = () => {

  }
  const formik = useFormik<IFormData>({
    initialValues,
    onSubmit: handleSubmit
  })
  return (
    <ChatSuggestionCardLayout text={'Выберите пункт приема от которого отправить сообщение'}>
      <FormikProvider value={formik}>
        <Form className={styles.root}>
        <ReceivingPointField onChange={handleChangeReceivingPointId} name={'receivingPointId'} selectProps={{
          menuPosition: 'absolute',
          menuPlacement: 'top'
        }}/>
        </Form>
      </FormikProvider>
    </ChatSuggestionCardLayout>
  )

}
