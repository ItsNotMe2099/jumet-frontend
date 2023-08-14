import styles from './index.module.scss'
import {Form, FormikProvider, useFormik} from 'formik'
import Validator from '@/utils/validator'
import InputField from '@/components/fields/InputField'
import Button from '@/components/ui/Button'
import Spacer from '@/components/ui/Spacer'
import FormFieldset from '@/components/ui/FormFieldset'
import PhoneField from '@/components/fields/PhoneField'
import {RepresentativeWrapper, useRepresentativeContext} from '@/context/representative_state'
import {useState} from 'react'
import RepresentativeCreateSuccess from '@/components/for_pages/LkPage/Representatives/RepresentativeCreateSuccess'
import FormErrorScroll from '@/components/ui/FormErrorScroll'


interface IFormData {
  firstName: string | null,
  lastName: string | null,
  patronymic: string | null,
  phone: string | null
}

interface Props {
  hasAddOtherButton?: boolean
}

const RepresentativeFormInner = (props: Props) => {
  const representativeContext = useRepresentativeContext()
  const [isSuccess, setIsSuccess] = useState(false)
  const handleSubmit = async (data: IFormData) => {
    if(representativeContext.representativeId){
      await representativeContext.update(data)
    }else{
      await representativeContext.create(data)
    }

    setIsSuccess(true)
  }

  const initialValues: IFormData = {
    firstName: null,
    lastName: null,
    patronymic: null,
    phone: null
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })

  const handleAddNewClick = () => {
    formik.resetForm()
    setIsSuccess(false)

  }
  return (
    <div className={styles.root}>
      {isSuccess ?
        <div className={styles.success}>
          <RepresentativeCreateSuccess code={representativeContext.representative?.code ?? null}/>
          {props.hasAddOtherButton && <div><Button onClick={handleAddNewClick} spinner={representativeContext.editLoading} type='submit' styleType='large' color='blue'>
            Добавить еще представителя
          </Button></div>}
        </div>
        :
        <FormikProvider value={formik}>
          <Form className={styles.form}>
            <FormErrorScroll formik={formik} />
            <FormFieldset title={'ФИО Представителя*'}>
              <InputField
                name='lastName'
                placeholder='Фамилия'
                validate={Validator.required}/>
              <InputField
                name='firstName'
                placeholder='Имя'
                validate={Validator.required}/>
              <InputField
                name='patronymic'
                placeholder='Отчество'/>
            </FormFieldset>
            <Spacer basis={16}/>
            <PhoneField
              name='phone'
              validate={Validator.required}
              label={'Телефон представителя*'}/>
            <Spacer basis={16}/>
            <div>
              <Button spinner={representativeContext.editLoading} type='submit' styleType='large' color='blue'>
                Добавить представителя
              </Button>
            </div>
          </Form>
        </FormikProvider>}
    </div>
  )
}


export default function RepresentativeForm(props: Props) {
  return (<RepresentativeWrapper>
    <RepresentativeFormInner hasAddOtherButton={props.hasAddOtherButton ?? false}/>
  </RepresentativeWrapper>)
}
