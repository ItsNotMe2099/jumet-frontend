import styles from './index.module.scss'
import BonusInvoiceCreateForm from '@/components/for_pages/LkPage/BonusBuyer/BonusInvoiceCreateForm'
import {LkPageLayout} from '@/pages/lk'
interface Props {

}

const BonusInvoiceCreatePage = (props: Props) => {
  return (
    <div className={styles.root}>
      <BonusInvoiceCreateForm/>
    </div>
  )
}
BonusInvoiceCreatePage.getLayout = LkPageLayout
export default BonusInvoiceCreatePage
