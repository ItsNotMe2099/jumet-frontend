import IPointData from '@/data/interfaces/IPointData'
import CardLayout from '../../../CardLayout'
import styles from './index.module.scss'
import EmployeeCard from '@/components/for_pages/LkPage/Cards/EmployeeCard'

interface Props {
  item: IPointData
  additionalEl?: React.ReactNode
  topClassName?: string
  button?: React.ReactNode
  cardLayoutClass?: string
}

export default function EmployeesCard({ item, additionalEl, topClassName, button, cardLayoutClass }: Props) {

  return (
    <CardLayout className={cardLayoutClass} title='Сотрудники' additionalEl={additionalEl} topClassName={topClassName}>
      <div className={styles.root}>
        {item.employees.map((i, index) =>
          <EmployeeCard user={i} key={index} titleClassName={styles.title} cardLayoutClassName={styles.layout} />
        )}
      </div>
      {button}
    </CardLayout>
  )
}