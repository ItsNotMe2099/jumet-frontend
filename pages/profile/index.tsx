import Layout from '@/components/layout/Layout'
import styles from './index.module.scss'
import { useAppContext } from '@/context/state'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import LogoutSvg from '@/components/svg/LogoutSvg'
import { colors } from '@/styles/variables'
import classNames from 'classnames'
import { UserRole } from '@/data/enum/UserRole'
import ProfileSellerForm from '@/components/for_pages/ProfilePage/ProfileSellerForm'

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

  const items = [
    { text: 'Настройки профиля', value: 'settings' },
    { icon: <LogoutSvg color={colors.dark500} />, text: 'Выйти', value: 'exit' },
  ]

  const [option, setOption] = useState<string>('settings')

  return (
    <Layout>
      <div className={styles.root}>
        <div className={styles.title}>
          Настройки профиля
        </div>
        <div className={styles.container}>
          <div className={styles.menu}>
            {items.map((i, index) =>
              <div
                onClick={() => setOption(i.value)}
                key={index}
                className={classNames(styles.option, { [styles.active]: option === i.value })}>
                <span>{i.text}</span>{i.icon}
              </div>
            )}
          </div>
          <div className={styles.content}>
            {appContext.aboutMe?.role === UserRole.Seller && option === 'settings' &&
              <ProfileSellerForm />
            }
          </div>
        </div>
      </div>
    </Layout>
  )
}

