//import styles from './index.module.scss'
import {useAppContext} from '@/context/state'
import {UserRole} from '@/data/enum/UserRole'
import ProfileSellerForm from '@/components/for_pages/LkPage/Forms/ProfileSellerForm'
import ProfileBuyerForm from '@/components/for_pages/LkPage/Forms/ProfileBuyerForm'
import {getAuthServerSideProps} from '@/utils/auth'
import {LkPageLayout} from '@/pages/lk'
import {LkLayoutTitleData} from '@/context/lk_layout_content'

interface Props {

}

const ProfileSettingsPage = (props: Props) => {
  const appContext = useAppContext()
  return <>
    <LkLayoutTitleData title={'Настройка профиля'}/>
    {appContext.aboutMe?.role === UserRole.Seller && <ProfileSellerForm/>}
    {appContext.aboutMe?.role === UserRole.Buyer && <ProfileBuyerForm/>}
  </>
}
ProfileSettingsPage.getLayout = LkPageLayout
export default ProfileSettingsPage
export const getServerSideProps = getAuthServerSideProps()

