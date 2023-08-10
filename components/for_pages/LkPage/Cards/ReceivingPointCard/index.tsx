import CardLayout from '@/components/for_pages/Common/CardLayout'
import styles from './index.module.scss'
import Button from '@/components/ui/Button'
import EditSvg from '@/components/svg/EditSvg'
import {colors} from '@/styles/variables'
import Rating from '@/components/for_pages/Common/Rating'
import classNames from 'classnames'
import GraphSvg from '@/components/svg/GraphSvg'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'
import {Routes} from '@/types/routes'


interface Props {
  item: IReceivingPoint
  href?: string
}

export default function ReceivingPointCard({item, href}: Props) {

  return (
    <CardLayout contentClassName={styles.content} href={href ?? ''} topClassName={styles.top} title={item.name}
                additionalEl={
                  item.rating > 0 ? <div className={styles.additional}>
                    <Rating rating={item.rating}/>
                    <div className={classNames(styles.deals,
                      {
                        [styles.yesDeals]: true
                      })}>0 сделок за месяц
                    </div>
                  </div> : null
                }>
      <div className={classNames(styles.deals,
        {
          [styles.yesDeals]: true
        })}>0 сделок за месяц
      </div>
      <div className={styles.btns}>
        <Button className={styles.btnFirst} color='blue' styleType='large' icon={<GraphSvg color={colors.white}/>}>
          Статистика пункта приёма
        </Button>
        <Button href={Routes.lkReceivingPointInfo(item.id)} className={styles.btn} color='grey' styleType='large'
                icon={<EditSvg color={colors.blue500}/>}>
          Редактировать данные
        </Button>
      </div>
    </CardLayout>
  )
}
