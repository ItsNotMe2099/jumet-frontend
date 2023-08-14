import InputField from '@/components/fields/InputField'
import styles from './index.module.scss'
import {Form, FormikProvider, useFormik} from 'formik'
import PassportFormSection from '@/components/for_pages/Common/PassportFormSection'
import AddressField from '@/components/fields/AddressField'
import RadioField from '@/components/fields/RadioField'
import Button from '@/components/ui/Button'
import SelectField from '@/components/fields/SelectField'
import MastercardSvg from '@/components/svg/MastercardSvg'
import MaestroSvg from '@/components/svg/MaestroSvg'
import VisaSvg from '@/components/svg/VisaSvg'
import MirSvg from '@/components/svg/MirSvg'
import {useDealContext} from '@/context/deal_state'
import {IDealSetUpStepRequest} from '@/data/interfaces/IDealStepRequest'
import {Nullable} from '@/types/types'
import {IPassportData} from '@/data/interfaces/IPassportData'
import SwitchField from '@/components/fields/SwitchField'
import {RepresentativeListWrapper, useRepresentativeListContext} from '@/context/representative_list_state'
import UserUtils from '@/utils/UserUtils'
import CreateButton from '@/components/ui/Buttons/CreateButton'
import {DealPaymentType} from '@/data/enum/DealPaymentType'
import DealUtils from '@/utils/DealUtils'
import DateField from '@/components/fields/DateField'
import DealStepFormCardLayout from '@/components/for_pages/LkPage/DealEdit/components/DealStepFormCardLayout'
import FormFieldset from '@/components/ui/FormFieldset'
import {useAppContext} from '@/context/state'
import {IAddress} from '@/data/interfaces/IAddress'
import Validator from '@/utils/validator'
import TimeField from '@/components/fields/TimeField'
import {updatedDiff} from 'deep-object-diff'
import CurrentUserRepository from '@/data/repositories/CurrentUserRepository'
import {omit} from '@/utils/omit'
import {useState} from 'react'
import CheckBoxField from '@/components/fields/CheckBoxField'
import {Routes} from '@/types/routes'
import FormErrorScroll from '@/components/ui/FormErrorScroll'

interface IFormData extends IDealSetUpStepRequest {
  firstName: Nullable<string>
  lastName: Nullable<string>
  patronymic: Nullable<string>
  passport: IPassportData
  isRepresentative: boolean
  card: Nullable<string>
  isConfirmedPi?: boolean
}

interface Props {

}

const SetupStepFormInner = (props: Props) => {
  const appContext = useAppContext()
  const aboutMe = appContext.aboutMe
  const passportData = aboutMe?.passport ?? {}
  const dealContext = useDealContext()
  const deal = dealContext.deal!
  const representativeContext = useRepresentativeListContext()

  const [loadingInner, setLoadingInner] = useState(false)
  const loading = dealContext.editLoading || loadingInner
  const handleSubmit = async (data: IFormData) => {
    const userUpdated = updatedDiff({
      firstName: aboutMe?.firstName ?? null,
      lastName: aboutMe?.lastName ?? null,
      patronymic: aboutMe?.patronymic ?? null,
      isConfirmedPi: aboutMe?.isConfirmedPi ?? false,
    }, {
      firstName: data.firstName,
      lastName: data.lastName,
      patronymic: data.patronymic,
      isConfirmedPi: data.isConfirmedPi
    })
    const passportUpdated = updatedDiff({
      address: passportData?.address,
      date: passportData?.date,
      number: passportData?.number,
      issuedBy: passportData?.issuedBy,
      series: passportData?.series,
      scanId: passportData?.scan?.id,
    }, {
      address: data.passport?.address,
      date: data.passport?.date,
      number: data.passport?.number,
      issuedBy: data.passport?.issuedBy,
      series: data.passport?.series,
      scanId: data.passport?.scan?.id,
    })

    if (Object.keys(userUpdated).length > 0 || Object.keys(passportData).length > 0) {
      setLoadingInner(true)
      const res = await CurrentUserRepository.update({
        ...userUpdated,
        ...(Object.keys(passportUpdated).length > 0 ? {passport: passportUpdated} : {})
      })
      appContext.updateAboutMe(res)
      setTimeout(() => setLoadingInner(false), 50)
    }
    await dealContext.submitStepSetup(omit(data, ['firstName', 'lastName', 'patronymic', 'passport']) as IDealSetUpStepRequest)
    console.log('userUpdated', passportUpdated, data)
  }

  const initialValues: IFormData = {
    isRepresentative: false,
    isConfirmedPi: aboutMe?.isConfirmedPi ?? false,
    representativeId: null,
    firstName: aboutMe?.firstName ?? null,
    lastName: aboutMe?.lastName ?? null,
    patronymic: aboutMe?.patronymic ?? null,
    address: deal.address ?? null,
    location: deal.location ?? null,
    deliveryDate: null,
    deliveryTimeFrom: null,
    deliveryTimeTo: null,
    requiresDelivery: deal.requiresDelivery ?? false,
    requiresLoading: deal.requiresLoading ?? false,
    passport: {
      address: passportData?.address ?? null,
      date: passportData?.date ?? null,
      number: passportData?.number ?? null,
      issuedBy: passportData?.issuedBy ?? null,
      series: passportData?.series ?? null,
      scan: passportData?.scan ?? null,
    },
    paymentType: null,
    card: null
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })
  const handleChangeAddress = (address: IAddress | string | null) => {
    if (typeof address !== 'string' && address?.location) {
      formik.setFieldValue('location', address.location)
    }
  }

  return (
    <DealStepFormCardLayout title={'Оформить сделку'}>
      <FormikProvider value={formik}>
        <Form className={styles.root}>
          <FormErrorScroll formik={formik} />
          <SwitchField name={'isRepresentative'} label={'От имени представителя'}/>
          {formik.values.isRepresentative ?
            <>
              <SelectField<string | number> name='representativeId' options={representativeContext.data.data.map(i => ({
                label: UserUtils.getName(i),
                value: i.id
              }))} label='Выберите представителя*' validate={Validator.required}/>
              <div><CreateButton>Добавить представителя</CreateButton></div>
            </>
            :
            <>
              <FormFieldset title={'ФИО продавца*'}>
                <InputField name='lastName' placeholder='Фамилия' validate={Validator.required}/>
                <InputField name='firstName' placeholder='Имя' validate={Validator.required}/>
                <InputField name='patronymic' placeholder='Отчество'/>
              </FormFieldset>
              <FormFieldset title={'Паспортные данные (необходимы для оформления приёмо-\nсдаточного акта)*'}>
                <PassportFormSection/>
              </FormFieldset>
            </>
          }

          <SwitchField name={'requiresDelivery'} label={'Нужна доставка лома на пункт приёма'}/>
          <SwitchField name={'requiresLoading'} label={'Нужна погрзука'}/>

          {formik.values.requiresDelivery && <>
            <AddressField name='address' label='Адрес расположения лома*' onChange={handleChangeAddress}
                          validate={Validator.required}/>
            <FormFieldset title={'Удобное время доставки'}>
              <div className={styles.row}>
                <DateField name='deliveryDate' placeholder='Выберите дату' validate={Validator.required}/>
                <div className={styles.row}>
                  <TimeField name='deliveryTimeFrom' placeholder='Время от' validate={Validator.required}/>
                  <TimeField name='deliveryTimeTo' placeholder='Время до' validate={Validator.required}/>
                </div>
              </div>
            </FormFieldset>

          </>}
          <RadioField<DealPaymentType> options={[
            {label: DealUtils.getPaymentType(DealPaymentType.Cash), value: DealPaymentType.Cash},
            {label: DealUtils.getPaymentType(DealPaymentType.Card), value: DealPaymentType.Card},
            {label: DealUtils.getPaymentType(DealPaymentType.Cashless), value: DealPaymentType.Cashless},
          ]} name='paymentType' label='Предпочитаемый способ оплаты за лом' validate={Validator.required}/>
          {formik.values.paymentType === DealPaymentType.Card &&
            <FormFieldset title={'Укажите номер карты для приёма оплаты'}>
              <div className={styles.icons}>
                <MastercardSvg/>
                <MaestroSvg/>
                <VisaSvg/>
                <MirSvg/>
              </div>
              <InputField name='card' format='cardPan' validate={Validator.required}/>
            </FormFieldset>
          }
          {!formik.values.representativeId && <CheckBoxField name='isConfirmedPi'
                         validate={Validator.required}
                         label={`Отправляя форму, я даю своё согласие с [Политикой обработки персональных данных](${Routes.personalDataPolitics})`} />}

          <div>
            <Button type='submit' spinner={loading} color='blue' styleType='large'>Оформить
              сделку</Button>
          </div>
        </Form>
      </FormikProvider>
    </DealStepFormCardLayout>
  )
}

export default function SetupStepFormCard(props: Props) {
  return <RepresentativeListWrapper limit={100}>
    <SetupStepFormInner/>
  </RepresentativeListWrapper>
}
