import Button from '@/components/ui/Button'
import styles from './index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import AttachSvg from '@/components/svg/AttachSvg'
import { colors } from '@/styles/variables'
import SendSvg from '@/components/svg/SendSvg'
import TextField from '@/components/fields/TextField'
import Validator from '@/utils/validator'

import { FileUploadAcceptType } from '@/types/enums'
import FileField from '@/components/fields/FileField'

interface Props {

}

export default function ChatMessageForm(props: Props) {

  const handleSubmit = async (/*data*/) => {

  }

  const initialValues = {
    message: '',
    file: []
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })

  console.log(formik.values)

  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <FileField
          showPreview={false}
          name='file'
          accept={[FileUploadAcceptType.Image, FileUploadAcceptType.Document, FileUploadAcceptType.Archives]}
          validate={Validator.required}
          image={<AttachSvg color={colors.dark500} />}
          sectionClass={styles.section}
          className={styles.attach}
        />
        <TextField
          className={styles.message}
          showError={false}
          validate={Validator.required}
          name='message'
          placeholder='Сообщение'
        />
        <Button className={styles.btn} color='blue' styleType='small'>
          <SendSvg color={colors.white} />
        </Button>
      </Form>
    </FormikProvider>
  )
}