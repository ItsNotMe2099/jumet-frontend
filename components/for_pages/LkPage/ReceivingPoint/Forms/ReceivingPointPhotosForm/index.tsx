import styles from 'components/for_pages/LkPage/ReceivingPoint/Forms/ReceivingPointPhotosForm/index.module.scss'
import {Form, FormikProvider, useFormik} from 'formik'
import {FileUploadAcceptType} from '@/types/enums'
import Validator from '@/utils/validator'
import {ReactElement} from 'react'
import FileListField from '@/components/fields/Files/FileListField'


import IFile from '@/data/interfaces/IFile'
import {DeepPartial} from '@/types/types'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'

interface IFormData {
  photos?: IFile[],
}

interface Props {
  receivingPoint: IReceivingPoint | null
  footer: ReactElement
  onSubmit: (data: DeepPartial<IReceivingPoint>) => Promise<void>
}

export default function ReceivingPointPhotosForm(props: Props) {

  const handleSubmit = async (data: IFormData) => {
    props.onSubmit({photosIds: data.photos?.map(i => i.id)})
  }

  const formik = useFormik({
    initialValues: {
      photos: props.receivingPoint?.photos ?? [],
    },
    onSubmit: handleSubmit
  })

  return (
    <FormikProvider value={formik}>
      <Form className={styles.root}>
         <FileListField
          name='photos'
          accept={[FileUploadAcceptType.Image]}
          validate={Validator.required}
          //text={<>Перетащите сюда или <span>выберите фото</span> пункта<br /> приёма</>}
        />
        {props.footer}
      </Form>
    </FormikProvider>
  )
}
