import {UserRole} from '@/data/enum/UserRole'
import {getAuthServerSideProps} from '@/utils/auth'
import {LkPageLayout} from '@/pages/lk'
import {LkLayoutTitleData} from '@/context/lk_layout_content'
import ApiSettingsForm from '@/components/for_pages/LkPage/Forms/ApiSettingsFrom'

interface Props {

}

const ApiSettingsPage = (props: Props) => {
  return <>
    <LkLayoutTitleData title={'API'}/>
    <ApiSettingsForm/>
  </>
}
ApiSettingsPage.getLayout = LkPageLayout
export default ApiSettingsPage
export const getServerSideProps = getAuthServerSideProps(UserRole.Buyer)

