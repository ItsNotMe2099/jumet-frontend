import Layout from '@/components/layout/Layout'
//import styles from './index.module.scss'
import { useAppContext } from '@/context/state'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import LogoutSvg from '@/components/svg/LogoutSvg'
import { colors } from '@/styles/variables'
import { UserRole } from '@/data/enum/UserRole'
import { ProfileMenuSettings } from '@/types/enums'
import ChevronDownSvg from '@/components/svg/ChevronDownSvg'
import IUser from '@/data/interfaces/IUser'
import BuyerRepository from '@/data/repositories/BuyerRepository'
import { Gender } from '@/data/enum/Gender'
import LkLayout from '@/components/for_pages/LkPage/layout'

interface Props {

}

export default function LkPage(props: Props) {

  const appContext = useAppContext()

  const router = useRouter()

  const token = Cookies.get('accessToken')

  console.log('ROUTER', router.asPath)

  useEffect(() => {
    if (!token) {
      router.push('/')
    }
  }, [])

  const items = appContext.aboutMe?.role !== UserRole.Seller ? [
    { text: 'Настройки профиля', value: ProfileMenuSettings.Settings, link: `/lk/${ProfileMenuSettings.Settings}` },
    { icon: <LogoutSvg color={colors.dark500} />, text: 'Выйти', value: 'exit', link: '' },
  ] :
    [
      { text: 'Настройки профиля', value: ProfileMenuSettings.Settings, link: `/lk/${ProfileMenuSettings.Settings}` },
      {
        icon: <ChevronDownSvg color={colors.dark500} />, text: 'Мои пункты приема', value: ProfileMenuSettings.ReceivingPoints,
        link: `/lk/${ProfileMenuSettings.ReceivingPoints}`
      },
      { text: 'Сотрудники', value: ProfileMenuSettings.Employees, link: `/lk/${ProfileMenuSettings.Employees}` },
      { text: 'Оплата сервиса Jumet', value: ProfileMenuSettings.Payment, link: `/lk/${ProfileMenuSettings.Payment}` },
      { icon: <LogoutSvg color={colors.dark500} />, text: 'Выйти', value: 'exit', link: '' },
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

  const getTitle = (path: string) => {
    switch (path) {
      case `/lk/${ProfileMenuSettings.Settings}`:
        return 'Настройки профиля'
      case `/lk/${ProfileMenuSettings.ReceivingPoints}`:
        return 'Мои пункты приема'
      case `/lk/${ProfileMenuSettings.Employees}`:
        return 'Сотрудники'
      case `/lk/${ProfileMenuSettings.Payment}`:
        return 'Оплата сервиса Jumet'
    }
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

  const receivingPoints = [
    { id: 1, address: 'г. Сергиев Посад, ул. Мира, 32' },
    { id: 2, address: 'г. Сергиев Посад, ул. Ленина, 32' },
  ]

  useEffect(() => {
    if (router.asPath === `/lk/${ProfileMenuSettings.Employees}`) {
      fetchEmployees()
    }
  }, [router.asPath])

  return (
    <Layout>
      <LkLayout>
        
      </LkLayout>
    </Layout>
  )
}

