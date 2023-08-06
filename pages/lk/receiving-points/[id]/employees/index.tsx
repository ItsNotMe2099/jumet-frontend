import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import BuyerRepository from '@/data/repositories/BuyerRepository'
import IUser from '@/data/interfaces/IUser'
import EmployeeCard from '@/components/for_pages/LkPage/Cards/EmployeeCard'
import {getAuthServerSideProps} from '@/utils/auth'
import {UserRole} from '@/data/enum/UserRole'
import {useAppContext} from '@/context/state'
import { LkReceivingPageLayout} from '@/pages/lk'
import styles from './index.module.scss'
interface Props {

}

const ReceivingPointEmployeesPage = (props: Props) => {
  const appContext = useAppContext()
  const router = useRouter()

  const [employees, setEmployees] = useState<IUser[]>([])

  const fetchEmployees = () => {
    BuyerRepository.fetchEmployees().then(data => {
      if (data) {
        setEmployees(data)
      }
    })
  }


  useEffect(() => {
      fetchEmployees()
    }
    , [])

  return (
    <div className={styles.root}>
        {employees.map((i, index) =>
          <EmployeeCard user={i} key={index}/>
        )}
    </div>
  )
}

ReceivingPointEmployeesPage.getLayout = LkReceivingPageLayout
export default ReceivingPointEmployeesPage
export const getServerSideProps = getAuthServerSideProps(UserRole.Buyer)
