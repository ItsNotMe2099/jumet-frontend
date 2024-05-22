import styles from './index.module.scss'
import {useAppContext} from '@/context/state'
import {getAuthServerSideProps} from '@/utils/auth'
import {LkPageLayout} from '@/pages/lk'
import {LkLayoutTitleData} from '@/context/lk_layout_content'
import BonusBuyer from '@/components/for_pages/LkPage/BonusBuyer'

interface Props {

}

const BonusPage = (props: Props) => {
  const appContext = useAppContext()
  return <div className={styles.root}>
    <LkLayoutTitleData title={'Возмещение бонусов'}/>
    <BonusBuyer/>
  </div>
}
BonusPage.getLayout = LkPageLayout
export default BonusPage
export const getServerSideProps = getAuthServerSideProps()

