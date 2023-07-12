import IPointData from '@/data/interfaces/IPointData'
import CardLayout from '../../CardLayout'
import styles from './index.module.scss'
import EmployeeCard from '@/components/for_pages/LkPage/Cards/EmployeeCard'

interface Props {
  item: IPointData
  additionalEl?: React.ReactNode
  topClassName?: string
}

export default function EmployeesCard({ item, additionalEl, topClassName }: Props) {

  return (
    <CardLayout title='Сотрудники' additionalEl={additionalEl} topClassName={topClassName}>
      <div className={styles.root}>
        {item.employees.map((i, index) =>
          <EmployeeCard user={i} key={index} titleClassName={styles.title} cardLayoutClassName={styles.layout} />
        )}
      </div>
    </CardLayout>
  )
}