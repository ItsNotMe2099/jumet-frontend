import CardLayout from '@/components/for_pages/Common/CardLayout'
import styles from './index.module.scss'
import IPointData from '@/data/interfaces/IPointData'
import Button from '@/components/ui/Button'
import EditSvg from '@/components/svg/EditSvg'
import { colors } from '@/styles/variables'
import Rating from '@/components/for_pages/Common/Rating'
import classNames from 'classnames'
import GraphSvg from '@/components/svg/GraphSvg'


interface Props {
  point: IPointData
}

export default function ReceivingPointCard({ point }: Props) {

  return (
    <CardLayout contentClassName={styles.content} topClassName={styles.top} title={point.title} additionalEl={
      <div className={styles.additional}>
        <Rating rating={point.rating} />
        <div className={classNames(styles.deals,
          {
            [styles.yesDeals]: point.dealsPerMonth && point.dealsPerMonth > 0
          })}>{point.dealsPerMonth} сделок за месяц</div>
      </div>
    }>
      <div className={styles.btns}>
        <Button className={styles.btnFirst} color='blue' styleType='large' icon={<GraphSvg color={colors.white} />}>
          Статистика пункта приёма
        </Button>
        <Button className={styles.btn} color='grey' styleType='large' icon={<EditSvg color={colors.blue500} />}>
          Редактировать данные
        </Button>
      </div>
    </CardLayout>
  )
}
