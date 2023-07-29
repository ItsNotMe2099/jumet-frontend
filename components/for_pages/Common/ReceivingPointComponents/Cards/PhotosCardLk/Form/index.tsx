import styles from './index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import Validator from '@/utils/validator'
import { FileUploadAcceptType } from '@/types/enums'
import Button from '@/components/ui/Button'
import FileField from '@/components/fields/Files/FileField'


interface Props {

}

export default function PhotosForm(props: Props) {

  const handleSubmit = async (/*data*/) => {

  }

  const initialValues = {
    photo: []
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })

  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <FileField
          name='photo'
          accept={[FileUploadAcceptType.Image]}
          validate={Validator.required}
          vertical
          isImage
          text={<div className={styles.text}>Перетащите сюда или <span>выберите фото</span><br />
            пункта приема</div>}
        />
        <Button type='submit' className={styles.btn} color='blue' styleType='large'>
          Добавить
        </Button>
      </Form>
    </FormikProvider>
  )
}
