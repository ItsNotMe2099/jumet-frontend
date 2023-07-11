import Layout from '@/components/layout/Layout'
//import styles from './index.module.scss'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import LkLayout from '@/components/for_pages/LkPage/layout'
import { Gender } from '@/data/enum/Gender'
import { UserRole } from '@/data/enum/UserRole'
import BuyerRepository from '@/data/repositories/BuyerRepository'
import IUser from '@/data/interfaces/IUser'
import { useAppContext } from '@/context/state'
import EmployeeCard from '@/components/for_pages/LkPage/Cards/EmployeeCard'

interface Props {

}

export default function ReceivingPointEmployeesPage(props: Props) {

  const router = useRouter()

  const appContext = useAppContext()

  const token = Cookies.get('accessToken')

  console.log('ROUTER', router.asPath)

  useEffect(() => {
    if (!token) {
      router.push('/')
    }
  }, [])

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
    fetchEmployees()
  }
    , [])

  return (
    <Layout>
      <LkLayout myPointsOpen>
        {appContext.aboutMe?.role !== UserRole.Buyer &&
                  /*employees*/tempEmps.map((i, index) =>
          <EmployeeCard user={i} key={index} />
        )
        }
      </LkLayout>
    </Layout>
  )
}

