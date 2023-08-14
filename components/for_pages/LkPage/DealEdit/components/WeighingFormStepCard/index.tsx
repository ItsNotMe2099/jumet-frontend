import styles from './index.module.scss'
import {Form, FormikProvider, useFormik} from 'formik'
import Button from '@/components/ui/Button'
import {useDealContext} from '@/context/deal_state'
import {IDealWeighingStepRequest} from '@/data/interfaces/IDealStepRequest'
import {Nullable} from '@/types/types'
import {useRepresentativeListContext} from '@/context/representative_list_state'
import IFile from '@/data/interfaces/IFile'
import PercentField from '@/components/fields/PercentField'
import TextAreaField from '@/components/fields/TextAreaField'
import FileField from '@/components/fields/Files/FileField'
import DealStepFormCardLayout from '@/components/for_pages/LkPage/DealEdit/components/DealStepFormCardLayout'
import Validator from '@/utils/validator'
import WeightWithUnitField from '@/components/fields/WeightWithUnitField'
import FormErrorScroll from '@/components/ui/FormErrorScroll'

interface IFormData extends IDealWeighingStepRequest {
  acceptanceCertificate: Nullable<IFile>
  weighingPhoto: Nullable<IFile>
}

interface Props {

}

export default function WeighingFormStepCard(props: Props) {
  const dealContext = useDealContext()
  const representativeContext = useRepresentativeListContext()
  const loading = dealContext.editLoading
  const handleSubmit = async (data: IFormData) => {
      await dealContext.submitStepWeighing({...data, weighingPhotoId: data.weighingPhoto?.id, acceptanceCertificateId: data.acceptanceCertificate?.id })
  }

  const initialValues: IFormData = {
    actualWeight: null,
    actualRubbishInPercents: null,
    weighingComment: null,
    acceptanceCertificate: null,
    weighingPhoto: null
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })


  return (
    <DealStepFormCardLayout title={'Результат взвешивания'}>
      <FormikProvider value={formik}>
        <Form className={styles.root}>
          <FormErrorScroll formik={formik} />
          <WeightWithUnitField name='actualWeight' label={'Вес лома'} validate={Validator.required}/>
          <PercentField name='actualRubbishInPercents' label={'Засор'} suffix={'%'} validate={Validator.required}/>
          <TextAreaField name='weighingComment' label={'Комментарий'} />
          <FileField name={'weighingPhoto'} label={'Фотоподтверждение лома'} validate={Validator.required}
                     text={<>Перетащите сюда или <span>выберите фото</span><br/>
                       подтверждения взвешивания лома</>}/>
          <FileField name={'acceptanceCertificate'} label={'Приёмо-сдаточный акт'}
                     text={<>Перетащите сюда или <span>выберите файл</span><br/>
                       приёмо-сдаточный акт</>} validate={Validator.required}/>
          <div className={styles.buttons}>
            <Button type='submit' spinner={loading} disabled={loading || dealContext.terminateLoading} color='blue'
                    styleType='large'>Оформить сделку</Button>
            <Button type='button' spinner={dealContext.terminateLoading} color='greyRed' styleType='large' onClick={() => dealContext.terminateByBuyer()}>Расторгнуть
              сделку</Button>
          </div>
        </Form>
      </FormikProvider>
    </DealStepFormCardLayout>
  )
}
