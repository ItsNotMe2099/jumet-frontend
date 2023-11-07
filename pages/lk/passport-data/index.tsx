import {useAppContext} from '@/context/state'
import {UserRole} from '@/data/enum/UserRole'
import {getAuthServerSideProps} from '@/utils/auth'
import {LkPageLayout} from '@/pages/lk'
import {LkLayoutTitleData} from '@/context/lk_layout_content'
import UserPassportDataForm from '@/components/for_pages/LkPage/Forms/UserPassportDataForm'
import {useState} from 'react'
import PassportDataViewSection from '@/components/for_pages/Common/PassportDataViewSection'
import EditButton from '@/components/ui/Buttons/EditButton'
import DeleteButton from '@/components/ui/Buttons/DeleteButton'
import styles from './index.module.scss'
import {AboutMeWrapper, useAboutMeContext} from '@/context/aboutme_state'
import DescField from '@/components/ui/DescField'
import UserUtils from '@/utils/UserUtils'
interface Props {

}

const ProfileSettingsPageInner = (props: Props) => {
  const appContext = useAppContext()
  const aboutMeContext = useAboutMeContext()
  const [isEdit, setIsEdit] = useState(false)
  const passportData = appContext?.aboutMe?.passport
  const handleDelete = () => {
    aboutMeContext.deletePassportData()
  }
  return <div className={styles.root}>
    <LkLayoutTitleData title={'Паспортные данные'}/>
    {(!isEdit && passportData) && <div className={styles.fields}>
      {appContext.aboutMe && <DescField label={'ФИО'} value={`${UserUtils.getName(appContext.aboutMe)}`}/>}

      <PassportDataViewSection scanModalTitle={'Скан вашего паспорта'} passportData={passportData}/>
      <DescField label={'Согласие на обработку персональных данных'} value={<>Вы дали согласие на обработку персональных данных. <span className={styles.link} onClick={handleDelete}>Отозвать согласие на обработку персональных данных</span></>}/>
    </div>}
    {(isEdit ||  !passportData)  && <UserPassportDataForm onSubmit={() => setIsEdit(false)}/>}
    {(!isEdit && passportData) && <div className={styles.buttons}>
      <EditButton disabled={aboutMeContext.deleteLoading} onClick={() => setIsEdit(true)}/>
      <DeleteButton  spinner={aboutMeContext.deleteLoading} onClick={handleDelete} >Удалить данные</DeleteButton>
    </div>}

  </div>
}

const ProfileSettingsPage = (props: Props) => {
 return <AboutMeWrapper>
   <ProfileSettingsPageInner/>
 </AboutMeWrapper>
}
ProfileSettingsPage.getLayout = LkPageLayout
export default ProfileSettingsPage
export const getServerSideProps = getAuthServerSideProps(UserRole.Seller)

