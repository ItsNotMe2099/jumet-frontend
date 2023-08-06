import Layout from '@/components/layout/Layout'
//import styles from './index.module.scss'
import { useAppContext } from '@/context/state'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import IUser from '@/data/interfaces/IUser'
import BuyerRepository from '@/data/repositories/BuyerRepository'
import LkLayout from '@/components/for_pages/LkPage/layout'
import {LkLayoutActionsData, LkLayoutTitleData} from '@/context/lk_layout_content'
import CreateButton from '@/components/ui/Buttons/CreateButton'

interface Props {

}

export default function EmpolyeesPage(props: Props) {

  const appContext = useAppContext()

  const router = useRouter()

  const token = Cookies.get('accessToken')



  useEffect(() => {
    if (!token) {
      router.push('/')
    }
  }, [])

  const [employees, setEmployees] = useState<IUser[]>([])

  const fetchEmployees = () => {
    BuyerRepository.fetchEmployees().then(data => {
      if (data) {
        setEmployees(data)
      }
    })
  }

  return (
    <Layout>
      <LkLayoutTitleData title={'Пункты приема'}/>
      <LkLayoutActionsData actions={[ <CreateButton fluid={appContext.isMobile} >
        Добавить сотрудника
      </CreateButton>
      ]}/>
      <LkLayout>
        {/*appContext.aboutMe?.role !== UserRole.Buyer &&
             tempEmps.map((i, index) =>
          <EmployeeCard user={i} key={index} />
        )
        */}
      </LkLayout>
    </Layout>
  )
}

