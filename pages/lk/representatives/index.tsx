//import styles from './index.module.scss'
import RepresentativeForm from '@/components/for_pages/LkPage/Common/RepresentativeForm'
import {getAuthServerSideProps} from '@/utils/auth'
import {UserRole} from '@/data/enum/UserRole'
import {LkPageLayout} from '@/pages/lk'
import {LkLayoutTitleData} from '@/context/lk_layout_content'

interface Props {

}

const LkRepresentativesPage = (props: Props) => {
  return (<>
      <LkLayoutTitleData title={'Доверители'}/>
       <RepresentativeForm/>
    </>
  )
}
LkRepresentativesPage.getLayout = LkPageLayout
export default LkRepresentativesPage
export const getServerSideProps = getAuthServerSideProps(UserRole.Seller)

