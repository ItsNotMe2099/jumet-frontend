import styles from './index.module.scss'
import ModalLayout from 'components/layout/Modal/ModalLayout'
import {useAppContext} from '@/context/state'
import ModalBody from '@/components/layout/Modal/ModalBody'
import {SaleRequestFormModalArguments} from '@/types/modal_arguments'
import ModalHeader from '@/components/layout/Modal/ModalHeader'
import {SaleRequestOwnerWrapper, useSaleRequestOwnerContext} from '@/context/sale_request_owner_state'
import {DeepPartial} from '@/types/types'
import {ISaleRequest} from '@/data/interfaces/ISaleRequest'
import CreateSalesRequestForm from '@/components/for_pages/create-sale-request/Form'

interface Props {
  isBottomSheet?: boolean
}

const SaleRequestFormModalInner = (props: Props) => {
  const appContext = useAppContext()
  const saleRequestOwnerContext = useSaleRequestOwnerContext()
  const handleSubmit = async (data: DeepPartial<ISaleRequest>) => {
      await saleRequestOwnerContext.editRequest(data)
    appContext.hideModal()
  }
  const header = (<div/>)

  const body = (
    <>
      <div className={styles.bodyWrapper}>

      </div>
    </>
  )

  const footer = (
    <></>
  )

  return (
    <ModalLayout fixed size={'large'}>
      <ModalHeader title={`Заявка № ${saleRequestOwnerContext.saleRequest?.id}`}/>
      <ModalBody fixed className={styles.body} >
        <CreateSalesRequestForm saleRequest={saleRequestOwnerContext.saleRequest} loading={saleRequestOwnerContext.editLoading} submit={handleSubmit}/>
      </ModalBody>
    </ModalLayout>
  )
}

export default function SaleRequestFormModal(props: Props) {
  const appContext = useAppContext()
  const args = appContext.modalArguments as SaleRequestFormModalArguments
  return (<SaleRequestOwnerWrapper saleRequest={args.saleRequest} saleRequestId={args.saleRequest?.id!}>
    <SaleRequestFormModalInner {...props} />
  </SaleRequestOwnerWrapper>)
}
