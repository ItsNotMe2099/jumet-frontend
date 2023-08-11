import styles from './index.module.scss'
import {Form, FormikProvider, useFormik} from 'formik'
import Button from '@/components/ui/Button'
import {useDealContext} from '@/context/deal_state'
import {Nullable} from '@/types/types'
import IFile from '@/data/interfaces/IFile'
import FileField from '@/components/fields/Files/FileField'
import DealStepFormCardLayout from '@/components/for_pages/LkPage/DealEdit/components/DealStepFormCardLayout'
import Validator from '@/utils/validator'

interface IFormData {
  paymentReceipt: Nullable<IFile>
}

interface Props {

}

export default function PayFormStepCard(props: Props) {
  const dealContext = useDealContext()
   const loading = dealContext.editLoading
  const handleSubmit = async (data: IFormData) => {
    await dealContext.submitStepPay({paymentReceiptId: data.paymentReceipt?.id})
  }

  const initialValues: IFormData = {
    paymentReceipt: null
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })



  return (
    <DealStepFormCardLayout title={'Квитанция об оплате'}>
      <FormikProvider value={formik}>
        <Form className={styles.root}>
          <FileField name={'paymentReceipt'} text={<>Перетащите сюда или <span>выберите файл</span><br />
            квитанции об оплате</>} validate={Validator.required}/>
          <div>
            <Button type='submit' spinner={loading} disabled={loading} color='blue' styleType='large'>Отправить</Button>
          </div>
          </Form>
      </FormikProvider>
    </DealStepFormCardLayout>
  )
}
