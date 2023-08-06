import InputField from '@/components/fields/InputField'
import styles from 'components/for_pages/LkPage/ReceivingPointCreateForm/components/UsersStep/index.module.scss'
import { FieldArray, Form, FormikProvider, useFormik } from 'formik'
import Validator from '@/utils/validator'
import Button from '@/components/ui/Button'
import CirclePlusSvg from '@/components/svg/CirclePlusSvg'
import { colors } from '@/styles/variables'
import FormStepFooter from '@/components/ui/FormStepFooter'
import {IFormStepProps} from '@/types/types'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'

interface IFormData{
  users: {name: string | null, email: string | null}[]
}

interface Props extends IFormStepProps<IReceivingPoint>{

}

export default function UsersStep(props: Props) {

  const handleSubmit = async (data: IFormData) => {
    props.onSubmit(data)
  }

  const initialValues: IFormData = {
    users: [
      { name: null, email: null }
    ]
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })



  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <FieldArray name='users'>
          {arrayHelpers => (
            <>
              {formik.values.users.map((item, index) => (
                <>
                  <InputField
                    label={'Имя и фамилия сотрудника'}
                    name={`users[${index}].name`}
                    validate={Validator.required}
                  />
                  <InputField
                    label={'Email сотрудника'}
                    name={`users[${index}].email`}
                    validate={Validator.combine([Validator.required, Validator.email])}
                  /></>))}
              <Button onClick={() => arrayHelpers.push({ name: null, email: null })} type='button' className={styles.add} styleType='large' color='grey'>
                <CirclePlusSvg color={colors.blue500} />
                Добавить еще сотрудника
              </Button>
            </>
          )}
        </FieldArray>
        <FormStepFooter hasBack onBack={props.onBack} spinner={props.loading}/>
      </Form>
    </FormikProvider>
  )
}
