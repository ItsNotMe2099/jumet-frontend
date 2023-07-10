import Layout from '@/components/layout/Layout'
//import styles from './index.module.scss'
import { useAppContext } from '@/context/state'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { UserRole } from '@/data/enum/UserRole'
import { ProfileMenuSettings } from '@/types/enums'
import ProfileBuyerForm from '@/components/for_pages/LkPage/Forms/ProfileBuyerForm'
import IUser from '@/data/interfaces/IUser'
import BuyerRepository from '@/data/repositories/BuyerRepository'
import EmployeeCard from '@/components/for_pages/LkPage/Cards/EmployeeCard'
import { Gender } from '@/data/enum/Gender'
import LkLayout from '@/components/for_pages/LkPage/layout'

interface Props {

}

export default function EmpolyeesPage(props: Props) {

  const appContext = useAppContext()

  const router = useRouter()

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
    if (router.asPath === `/lk/${ProfileMenuSettings.Employees}`) {
      fetchEmployees()
    }
  }, [router.asPath])

  return (
    <Layout>
      <LkLayout>
        {appContext.aboutMe?.role !== UserRole.Buyer &&
          <>
            {router.asPath === `/lk/${ProfileMenuSettings.Settings}` && <ProfileBuyerForm />}
            {router.asPath === `/lk/${ProfileMenuSettings.Employees}` &&
                  /*employees*/tempEmps.map((i, index) =>
              <EmployeeCard user={i} key={index} />
            )
            }
          </>
        }
      </LkLayout>
    </Layout>
  )
}

