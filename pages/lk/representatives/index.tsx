import Layout from '@/components/layout/Layout'
//import styles from './index.module.scss'
import {useAppContext} from '@/context/state'
import LkLayout from '@/components/for_pages/LkPage/layout'
import LkMenuSeller from '@/components/for_pages/LkPage/layout/LkMenuSeller'
import RepresentativeForm from '@/components/for_pages/LkPage/Common/RepresentativeForm'
import {getAuthServerSideProps} from '@/utils/auth'
import {UserRole} from '@/data/enum/UserRole'

interface Props {

}

export default function LkRepresentativesPage(props: Props) {
  const appContext = useAppContext()
  const menu = <LkMenuSeller/>

  return (
    <Layout>
      <LkLayout menu={menu}>
       <RepresentativeForm/>
      </LkLayout>
    </Layout>
  )
}

export const getServerSideProps = getAuthServerSideProps(UserRole.Seller)

