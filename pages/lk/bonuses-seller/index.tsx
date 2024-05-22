import styles from './index.module.scss'
import {useAppContext} from '@/context/state'
import {getAuthServerSideProps} from '@/utils/auth'
import {LkPageLayout} from '@/pages/lk'
import {LkLayoutTitleData} from '@/context/lk_layout_content'
import BonusSeller from '@/components/for_pages/LkPage/BonusSeller'

interface Props {

}

const BonusPage = (props: Props) => {
  const appContext = useAppContext()
  return <div className={styles.root}>
    <LkLayoutTitleData title={'Бонусный счет'}/>
    <BonusSeller/>
  </div>
}
BonusPage.getLayout = LkPageLayout
export default BonusPage
export const getServerSideProps = getAuthServerSideProps()

