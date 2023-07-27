import InputField from '@/components/fields/InputField'
import styles from 'components/for_pages/LkPage/ReceivingPointCreateForm/components/PersonnelStep/index.module.scss'
import { FieldArray, Form, FormikProvider, useFormik } from 'formik'
import Validator from '@/utils/validator'
import Button from '@/components/ui/Button'
import CirclePlusSvg from '@/components/svg/CirclePlusSvg'
import { colors } from '@/styles/variables'
import StepsControls from 'components/for_pages/LkPage/ReceivingPointCreateForm/components/StepsControls'


interface Props {
  onNextStep: (data?: any) => void
  onBack?: () => void
}

export default function PersonnelStep(props: Props) {

  const handleSubmit = async (/*data*/) => {
    props.onNextStep()
  }

  const initialValues = {
    items: [
      { name: '', email: '' }
    ]
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })

  console.log('formik.values', formik.values)

  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <FieldArray name='items'>
          {arrayHelpers => (
            <>
              {formik.values.items.map((item, index) => (
                <>
                  <InputField
                    label={'Имя и фамилия сотрудника'}
                    name={`items[${index}].name`}
                    validate={Validator.required}
                  />
                  <InputField
                    label={'Email сотрудника'}
                    name={`items[${index}].email`}
                    validate={Validator.combine([Validator.required, Validator.email])}
                  /></>))}
              <Button onClick={() => arrayHelpers.push({ name: '', email: '' })} type='button' className={styles.add} styleType='large' color='grey'>
                <CirclePlusSvg color={colors.blue500} />
                Добавить еще сотрудника
              </Button>
            </>
          )}
        </FieldArray>
        <StepsControls onBack={props.onBack} />
      </Form>
    </FormikProvider>
  )
}
