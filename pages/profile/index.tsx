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
import ProfileSellerForm from '@/components/for_pages/ProfilePage/Forms/ProfileSellerForm'
import { ProfileMenuSettings } from '@/types/enums'
import ProfileBuyerForm from '@/components/for_pages/ProfilePage/Forms/ProfileBuyerForm'
import ChevronDownSvg from '@/components/svg/ChevronDownSvg'
import IUser from '@/data/interfaces/IUser'
import BuyerRepository from '@/data/repositories/BuyerRepository'
import EmployeeCard from '@/components/for_pages/ProfilePage/Cards/EmployeeCard'
import { Gender } from '@/data/enum/Gender'
import Button from '@/components/ui/Button'
import PlusSvg from '@/components/svg/PlusSvg'

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

  const items = appContext.aboutMe?.role !== UserRole.Seller ? [
    { text: 'Настройки профиля', value: ProfileMenuSettings.Settings },
    { icon: <LogoutSvg color={colors.dark500} />, text: 'Выйти', value: 'exit' },
  ] :
    [
      { text: 'Настройки профиля', value: ProfileMenuSettings.Settings },
      { icon: <ChevronDownSvg color={colors.dark500} />, text: 'Мои пункты приема', value: ProfileMenuSettings.Places },
      { text: 'Сотрудники', value: ProfileMenuSettings.Employees },
      { text: 'Оплата сервиса Jumet', value: ProfileMenuSettings.Payment },
      { icon: <LogoutSvg color={colors.dark500} />, text: 'Выйти', value: 'exit' },
    ]

  const handleExit = () => {
    setTimeout(() => appContext.logout(), 100)
    router.push('/')
  }

  const [employees, setEmployees] = useState<IUser[]>([])

  console.log('employees', employees)

  const fetchEmployees = () => {
    BuyerRepository.fetchEmployees().then(data => {
      if (data) {
        setEmployees(data)
      }
    })
  }

  const tempEmps = [
    {
      id: '1',
      role: UserRole.Buyer,
      phone: '',
      login: '',
      name: 'Валерий Федоров',
      companyName: '«МеталлВторЧермет»',
      isRegistered: true,
      email: 'v.fedor@gmail.com',
      birthday: new Date(),
      gender: Gender.male,
      password: '',
      readedNotifications: []
    },
    {
      id: '1',
      role: UserRole.Buyer,
      phone: '',
      login: '',
      name: 'Валерий Федоров',
      companyName: '«МеталлВторЧермет»',
      isRegistered: true,
      email: 'v.fedor@gmail.com',
      birthday: new Date(),
      gender: Gender.male,
      password: '',
      readedNotifications: []
    },
  ]

  useEffect(() => {
    if (appContext.activeOption === ProfileMenuSettings.Employees) {
      fetchEmployees()
    }
  }, [appContext.activeOption])

  return (
    <Layout>
      <div className={styles.root}>
        <div className={styles.title}>
          <div className={styles.text}>{items.find((item) => item.value === appContext.activeOption)?.text}</div>
          {appContext.activeOption === ProfileMenuSettings.Employees &&
            <Button className={styles.btn} color='blue' styleType='large' icon={<PlusSvg color={colors.white} />}>
              Добавить сотрудника
            </Button>}
        </div>
        <div className={styles.container}>
          <div className={classNames(styles.menu, { [styles.buyer]: appContext.aboutMe?.role !== UserRole.Buyer })}>
            {items.map((i, index) =>
              <div
                onClick={() => i.value !== 'exit' ? appContext.setActiveOption(i.value) : handleExit()}
                key={index}
                className={classNames(styles.option, { [styles.active]: appContext.activeOption === i.value })}>
                <span>{i.text}</span>
                {i.icon && <div
                  className=
                  {classNames(styles.icon,
                    {
                      [styles.places]:
                        appContext.activeOption === ProfileMenuSettings.Places && i.value === ProfileMenuSettings.Places
                    })}>
                  {i.icon}
                </div>}
              </div>
            )}
          </div>
          {appContext.activeOption === ProfileMenuSettings.Employees && 
            <Button className={styles.btnMobile} color='blue' styleType='large' icon={<PlusSvg color={colors.white} />}>
              Добавить сотрудника
            </Button>}
          <div className={styles.content}>
            {appContext.aboutMe?.role !== UserRole.Seller &&
              <>
                {appContext.activeOption === ProfileMenuSettings.Settings && <ProfileSellerForm />}
              </>
            }
            {appContext.aboutMe?.role !== UserRole.Buyer &&
              <>
                {appContext.activeOption === ProfileMenuSettings.Settings && <ProfileBuyerForm />}
                {appContext.activeOption === ProfileMenuSettings.Employees &&
                  /*employees*/tempEmps.map((i, index) =>
                  <EmployeeCard user={i} key={index} />
                )
                }
              </>
            }
          </div>
        </div>
      </div>
    </Layout>
  )
}

