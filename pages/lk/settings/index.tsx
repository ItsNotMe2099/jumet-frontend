import Layout from '@/components/layout/Layout'
//import styles from './index.module.scss'
import { useAppContext } from '@/context/state'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { UserRole } from '@/data/enum/UserRole'
import ProfileSellerForm from '@/components/for_pages/LkPage/Forms/ProfileSellerForm'
import { ProfileMenuSettings } from '@/types/enums'
import ProfileBuyerForm from '@/components/for_pages/LkPage/Forms/ProfileBuyerForm'
import LkLayout from '@/components/for_pages/LkPage/layout'

interface Props {

}

export default function ProfileSettingsPage(props: Props) {

  const appContext = useAppContext()

  const router = useRouter()

  const token = Cookies.get('accessToken')

  console.log('ROUTER', router.asPath)

  useEffect(() => {
    if (!token) {
      router.push('/')
    }
  }, [])

  return (
    <Layout>
      <LkLayout>
        {appContext.aboutMe?.role !== UserRole.Seller &&
          <>
            {router.asPath === `/lk/${ProfileMenuSettings.Settings}` && <ProfileSellerForm />}
          </>
        }
        {appContext.aboutMe?.role !== UserRole.Buyer &&
          <>
            {router.asPath === `/lk/${ProfileMenuSettings.Settings}` && <ProfileBuyerForm />}
          </>
        }
      </LkLayout>
    </Layout>
  )
}

