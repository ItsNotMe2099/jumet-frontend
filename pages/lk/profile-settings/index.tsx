import Layout from '@/components/layout/Layout'
//import styles from './index.module.scss'
import {useAppContext} from '@/context/state'
import {UserRole} from '@/data/enum/UserRole'
import ProfileSellerForm from '@/components/for_pages/LkPage/Forms/ProfileSellerForm'
import ProfileBuyerForm from '@/components/for_pages/LkPage/Forms/ProfileBuyerForm'
import LkLayout from '@/components/for_pages/LkPage/layout'
import LkMenuSeller from '@/components/for_pages/LkPage/layout/LkMenuSeller'
import {getAuthServerSideProps} from '@/utils/auth'

interface Props {

}

export default function ProfileSettingsPage(props: Props) {
  const appContext = useAppContext()
  const menu = <LkMenuSeller/>

  return (
    <Layout>
      <LkLayout menu={menu}>
        {appContext.aboutMe?.role === UserRole.Seller && <ProfileSellerForm />}
        {appContext.aboutMe?.role === UserRole.Buyer && <ProfileBuyerForm />}
      </LkLayout>
    </Layout>
  )
}
export const getServerSideProps = getAuthServerSideProps()

