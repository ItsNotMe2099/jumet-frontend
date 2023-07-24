import Button from '@/components/ui/Button'
import styles from './index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import AttachSvg from '@/components/svg/AttachSvg'
import { colors } from '@/styles/variables'
import SendSvg from '@/components/svg/SendSvg'
import InputField from '@/components/fields/InputField'
import Validator from '@/utils/validator'
import { FileUploadAcceptType } from '@/types/enums'
import FileField from '@/components/fields/FileField'
import classNames from 'classnames'
import { useAppContext } from '@/context/state'

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

  const appContext = useAppContext()

  return (
    <FormikProvider value={formik}>
      <Form className={classNames(styles.form, { [styles.inactive]: !appContext.token })}>
        {!appContext.token && <div className={styles.block} />}
        <FileField
          showPreview={false}
          name='file'
          accept={[FileUploadAcceptType.Image, FileUploadAcceptType.Document, FileUploadAcceptType.Archives]}
          validate={Validator.required}
          image={<AttachSvg color={colors.dark500} />}
          sectionClass={styles.section}
          className={styles.attach}
        />
        <InputField
          className={styles.message}
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