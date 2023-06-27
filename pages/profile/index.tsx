import Layout from '@/components/layout/Layout'
import styles from './index.module.scss'
import { useAppContext } from '@/context/state'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import LogoutSvg from '@/components/svg/LogoutSvg'
import { colors } from '@/styles/variables'
import classNames from 'classnames'
import { UserRole } from '@/data/enum/UserRole'
import ProfileSellerForm from '@/components/for_pages/ProfilePage/ProfileSellerForm'
import { ProfileMenuSettings } from '@/types/enums'
import ProfileBuyerForm from '@/components/for_pages/ProfilePage/ProfileBuyerForm'

interface Props {

}

export default function ProfilePage(props: Props) {

  const appContext = useAppContext()

  const router = useRouter()

  const token = Cookies.get('accessToken')

  useEffect(() => {
    if (!token) {
      router.push('/')
    }
  }, [])

  const items = appContext.aboutMe?.role === UserRole.Seller ? [
    { text: 'Настройки профиля', value: ProfileMenuSettings.Settings },
    { icon: <LogoutSvg color={colors.dark500} />, text: 'Выйти', value: 'exit' },
  ] :
  [
    { text: 'Настройки профиля', value: ProfileMenuSettings.Settings },
    { text: 'Сотрудники', value: ProfileMenuSettings.Employees },
    { text: 'Оплата сервиса Jumet', value: ProfileMenuSettings.Payment },
    { icon: <LogoutSvg color={colors.dark500} />, text: 'Выйти', value: 'exit' },
  ]

  const handleExit = () => {
    setTimeout(() => appContext.logout(), 100)
    router.push('/')
  }

  return (
    <Layout>
      <div className={styles.root}>
        <div className={styles.title}>
          Настройки профиля
        </div>
        <div className={styles.container}>
          <div className={classNames(styles.menu, {[styles.buyer]: appContext.aboutMe?.role !== UserRole.Buyer})}>
            {items.map((i, index) =>
              <div
                onClick={() => i.value !== 'exit' ? appContext.setActiveOption(i.value) : handleExit()}
                key={index}
                className={classNames(styles.option, { [styles.active]: appContext.activeOption === i.value })}>
                <span>{i.text}</span>{i.icon}
              </div>
            )}
          </div>
          <div className={styles.content}>
            {appContext.aboutMe?.role === UserRole.Seller && appContext.activeOption === ProfileMenuSettings.Settings &&
              <ProfileSellerForm />
            }
            {appContext.aboutMe?.role === UserRole.Buyer && appContext.activeOption === ProfileMenuSettings.Settings &&
              <ProfileBuyerForm />
            }
          </div>
        </div>
      </div>
    </Layout>
  )
}

