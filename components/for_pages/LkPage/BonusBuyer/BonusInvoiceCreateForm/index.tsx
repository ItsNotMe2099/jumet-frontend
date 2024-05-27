import styles from './index.module.scss'
import {Form, FormikProvider, useFormik} from 'formik'
import {useAppContext} from '@/context/state'
import {SnackbarType} from '@/types/enums'
import Button from '@/components/ui/Button'
import {useAboutMeContext} from '@/context/aboutme_state'
import {Nullable, RequestError} from '@/types/types'
import FormErrorScroll from '@/components/ui/FormErrorScroll'
import FileField from '@/components/fields/Files/FileField'
import {useState} from 'react'
import {BonusBalanceWrapper, useBonusBalanceContext} from '@/context/bonus_balance_state'
import BonusInvoiceRepository from '@/data/repositories/BonusInvoiceRepository'
import IFile from '@/data/interfaces/IFile'
import Validator from '@/utils/validator'
import {useRouter} from 'next/router'
import {Routes} from '@/types/routes'
import Alert from '@/components/ui/Alert'
import Formatter from '@/utils/formatter'
import ContentLoader from '@/components/ui/ContentLoader'
import EmptyStub from '@/components/ui/EmptyStub'
import {AgreementWrapper, useAgreementContext} from '@/context/agreement_state'
import {AgreementType} from '@/data/enum/AgreementType'
import FormError from '@/components/ui/FormError'


interface IFormData {
  amount?: Nullable<number>
  invoiceFile: Nullable<IFile>

}

interface Props {

}

const BonusInvoiceCreateFormInner = (props: Props) => {
  const appContext = useAppContext()
  const router = useRouter()
  const aboutMeContext = useAboutMeContext()
  const bonusBalanceContext = useBonusBalanceContext()
  const [sending, setSending] = useState(false)
  const [agreement, setAgreement] = useState()
  const agreementContext = useAgreementContext()
  const [error, setError] = useState<string | null>(null)
  const handleSubmit = async (data: IFormData) => {
    setError(null)
    try {
      setSending(true)
      await BonusInvoiceRepository.create({invoiceFileId: data.invoiceFile!.id})
      appContext.showSnackbar('Счет создан', SnackbarType.success)
      router.replace(Routes.lkBonusesBuyer)
    }catch (err) {
      if (err instanceof RequestError) {
        setError(err.message)
      }
    }
    setSending(false)
  }

  const initialValues: IFormData = {
    invoiceFile: null,
    amount: null,
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })

  if (!bonusBalanceContext.isLoaded || !agreementContext.isLoaded) {
    return <div className={styles.loader}><ContentLoader style={'block'} isOpen={true}/></div>
  }
  if (!bonusBalanceContext.balance) {
    return <EmptyStub title={'Пока вы не получили ни одного бонуса'}
                      text={'Как только будет оплачена первая сделка можно будет выставить счет на выплату бонусов'}
                      actions={<Button color='blue' styleType='large' onClick={() => router.back()}>Назад
                      </Button>}/>
  }
  if (!agreementContext.byTypes[AgreementType.General as any]) {
    return <EmptyStub title={'Для выплаты бонусов необходимо заключить договор с Ломмаркет'}
                      text={'Свяжитесь с вашим менеджером для заключения договора'}
                      actions={<Button color='blue' styleType='large' onClick={() => router.back()}>Назад
                      </Button>}/>
  }
  return (

    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <div className={styles.heading}>Отправка счёта на возмещение бонусов</div>
        <Alert className={styles.alert} type={'attention'} text={<ul className={styles.list}>
          <li>В назначении платежа укажите «Возмещение средств по бонусной программе по
            договору {agreementContext.byTypes[AgreementType.General as any]?.number}»
          </li>
          <li>Сумма в счёте должна равняться {Formatter.formatPrice(bonusBalanceContext.balance!)} </li>
        </ul>}/>
        <FormErrorScroll formik={formik}/>
        <FileField disabled={sending} label={'Добавьте скан счета'} name={'invoiceFile'}
                   text={<>Перетащите сюда или <span>выберите файл</span><br/>
                     счета на оплату об оплате</>} validate={Validator.required}/>
        <FormError error={error}/>
        <Button spinner={sending} type='submit' className={styles.btn} styleType='large'
                color='blue'>
          Отправить
        </Button>
      </Form>
    </FormikProvider>
  )
}

export default function BonusInvoiceCreateForm(props: Props) {
  return (
    <BonusBalanceWrapper>
      <AgreementWrapper>
      <BonusInvoiceCreateFormInner/>
      </AgreementWrapper>
    </BonusBalanceWrapper>

  )
}
