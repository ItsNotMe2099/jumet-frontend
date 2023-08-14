import styles from './index.module.scss'
import RepresentativeForm from '@/components/for_pages/LkPage/Common/RepresentativeForm'
import {getAuthServerSideProps} from '@/utils/auth'
import {UserRole} from '@/data/enum/UserRole'
import {LkPageLayout} from '@/pages/lk'
import {LkLayoutTitleData} from '@/context/lk_layout_content'
import CardLayoutList from '@/components/for_pages/Common/CardLayoutList'
import RepresentativeList from '@/components/for_pages/LkPage/Representatives/RepresentativeList'

interface Props {

}

const LkRepresentativesPage = (props: Props) => {
  return (<>
      <LkLayoutTitleData title={'Представители'}/>
      <CardLayoutList>
        <div className={styles.card}>
          <div className={styles.title}>Добавьте представителей, от лица которых сможете совершать сделки</div>
          <RepresentativeForm hasAddOtherButton/>
        </div>
        <div className={styles.card}>
          <div className={styles.title}>Мои представители</div>
          <RepresentativeList/>
        </div>
      </CardLayoutList>
    </>
  )
}
LkRepresentativesPage.getLayout = LkPageLayout
export default LkRepresentativesPage
export const getServerSideProps = getAuthServerSideProps(UserRole.Seller)

