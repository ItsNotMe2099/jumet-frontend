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
import {IRepresentative} from '@/data/interfaces/IRepresentative'
import {Nullable} from '@/types/types'


interface IFormData {
  firstName: string | null,
  lastName: string | null,
  patronymic: string | null,
  phone: string | null
}

interface Props {
  hasAddOtherButton?: boolean
  representative?: Nullable<IRepresentative> | undefined
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
    firstName: props.representative?.firstName ?? null,
    lastName: props.representative?.lastName ?? null,
    patronymic: props.representative?.patronymic ?? null,
    phone: props.representative?.phone ?? null
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
              disabled={!!props.representative}
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
  return (<RepresentativeWrapper representative={props.representative} representativeId={props.representative?.id}>
    <RepresentativeFormInner hasAddOtherButton={props.hasAddOtherButton ?? false}/>
  </RepresentativeWrapper>)
}
