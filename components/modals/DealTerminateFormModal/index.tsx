import styles from './index.module.scss'
import Button from 'components/ui/Button'
import {useAppContext} from 'context/state'
import {DealTerminateFormModalArguments} from '@/types/modal_arguments'
import ModalLayout from '@/components/layout/Modal/ModalLayout'
import ModalHeader from '@/components/layout/Modal/ModalHeader'
import ModalBody from '@/components/layout/Modal/ModalBody'
import classNames from 'classnames'
import {TerminateReasonType} from '@/data/enum/TerminateReasonType'
import {Nullable} from '@/types/types'
import {Form, FormikProvider, useFormik} from 'formik'
import SelectField from '@/components/fields/SelectField'
import Validator from '@/utils/validator'
import DealUtils from '@/utils/DealUtils'
import {DealWrapper, useDealContext} from '@/context/deal_state'
import {UserRole} from '@/data/enum/UserRole'
import {IDealTermByBuyerStepRequest} from '@/data/interfaces/IDealStepRequest'

interface IFormData{
  terminateReasonType: Nullable<TerminateReasonType>
}
interface Props{
}
const DealTerminateFormModalInner = (props: Props) => {
  const appContext = useAppContext()
  const dealContext = useDealContext()

  const args = appContext.modalArguments as DealTerminateFormModalArguments
  const handleCancel = () => {
      appContext.hideModal()
  }
  const handleSubmit = async (data: IFormData) => {
    switch (appContext.aboutMe?.role){
      case UserRole.Buyer:
        await dealContext.terminateByBuyerRequest(data as IDealTermByBuyerStepRequest)
      case UserRole.Seller:
        await dealContext.terminateBySellerRequest(data)
    }
    appContext.hideModal()
  }

  const formik = useFormik({
    initialValues: {
      terminateReasonType: null
    },
    onSubmit: handleSubmit
  })
  const body = (<div className={styles.body}>
    <FormikProvider value={formik}>
      <Form className={styles.body}>
        {args.title && <div className={styles.title}>{args.title ?? 'Вы действительно хотите расторгнуть сделку?'}</div>}
        {args.text && <div className={styles.text}>{args.text ?? ''}</div>}
        <SelectField<TerminateReasonType>
          options={[
            {value: TerminateReasonType.NotDelivered, label: DealUtils.getTerminateReasonType(TerminateReasonType.NotDelivered)},
            {value: TerminateReasonType.PriceChanged, label: DealUtils.getTerminateReasonType(TerminateReasonType.PriceChanged)},
            {value: TerminateReasonType.RubbishChanged, label: DealUtils.getTerminateReasonType(TerminateReasonType.RubbishChanged)},
            {value: TerminateReasonType.PhotoDifference, label: DealUtils.getTerminateReasonType(TerminateReasonType.PhotoDifference)},
            {value: TerminateReasonType.LocationChanged, label: DealUtils.getTerminateReasonType(TerminateReasonType.LocationChanged)},
           ]}
          label={'Выберите причину расторжения'}
          name={'terminateReasonType'}
          validate={Validator.required}
        />
        <div className={styles.buttons}>
          <Button styleType={'large'} color='transparent' fluid type="button" onClick={handleCancel}>
            Закрыть окно
          </Button>
          <Button  type={'submit'} className={classNames(styles.confirmButton, {[styles.red]: true})}  styleType={'large'} color='grey' fluid>
            Да рас
          </Button>
        </div>
      </Form>
    </FormikProvider>

    </div>
  )


  return (
    <ModalLayout size={'small'}  >
      <ModalHeader className={styles.header}/>
      <ModalBody className={styles.modalBody}>{body}</ModalBody>
    </ModalLayout>
  )

}

export function DealTerminateFormModal(props: Props) {
  const appContext = useAppContext()

  const args = appContext.modalArguments as DealTerminateFormModalArguments


  return <DealWrapper dealId={args.deal.id} deal={args.deal}>

  </DealWrapper>
}
