//import styles from './index.module.scss'
import {LkLayoutTitleData} from '@/context/lk_layout_content'
import {LkPageLayout} from '@/pages/lk'

interface Props {

}

const LkPaymentPage = (props: Props) => {
  return (<>
      <LkLayoutTitleData title={'Оплата'}/>
    </>
  )
}
LkPaymentPage.getLayout = LkPageLayout
export default LkPaymentPage

