import styles from './index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import Validator from '@/utils/validator'
import Button from '@/components/ui/Button'
import { ModalType, SnackbarType} from '@/types/enums'
import PhoneField from '@/components/fields/PhoneField'
import Already from '@/components/for_pages/Common/Already'
import { useAppContext } from '@/context/state'
import { useAuthContext } from '@/context/auth_state'
import {RequestError} from '@/types/types'
import {Routes} from '@/types/routes'
import {useState} from 'react'
import AuthRepository from '@/data/repositories/AuthRepository'
import {OtpCodeModalArguments} from '@/types/modal_arguments'
import {useRouter} from 'next/router'
import {IAuthResponse} from '@/data/interfaces/IAuthResponse'
import FormErrorScroll from '@/components/ui/FormErrorScroll'
import {SITE_NAME} from '@/types/constants'


interface Props {

}

export default function SellerRegForm(props: Props) {
  const appContext = useAppContext()

  const authContext = useAuthContext()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const redirect = router.query.redirect as string
  const handleCodeConfirmed = async (res: IAuthResponse) => {
    appContext.setToken(res.accessToken)
   const  user = await appContext.updateAboutMe()
    appContext.hideModal()
    if(user?.isRegistered){
      if (redirect) {
        router.replace(redirect)
      } else {
        router.replace(Routes.index)
      }
    }else{
      router.push(Routes.registrationComplete)

    }
  }

  const handleSubmit = async (data: {phone: string}) => {
    setLoading(true)
    let accessToken: string = ''
    try {
      const res = await AuthRepository.sellerSendCode(data.phone)
      appContext.showModal(ModalType.OtpCode, {...res, mode: 'phone', login: data.phone, onConfirm: handleCodeConfirmed, onSendAgain: () => AuthRepository.sellerSendCode(data.phone)} as OtpCodeModalArguments)


    } catch (err) {

      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }

    }


    setLoading(false)
  }
  const initialValues = {
    phone: '',
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })




  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <FormErrorScroll formik={formik} />
        <PhoneField
          name='phone'
          label='Телефон'
          disabled={loading}
          validate={Validator.combine([Validator.required, Validator.phone])}
        />
        <Button disabled={loading} type='submit' className={styles.btn} styleType='large' color='blue'>
          Зарегистрироваться
        </Button>
        <Already
          topText={`Уже есть аккаунт на ${SITE_NAME}?`}
          btnText='Войти'
          link={Routes.login()} />
      </Form>
    </FormikProvider>
  )
}
