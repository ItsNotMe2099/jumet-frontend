import CardLayout from '@/components/for_pages/Common/CardLayout'
import styles from './index.module.scss'
import { useState } from 'react'
import ChevronDownSvg from '@/components/svg/ChevronDownSvg'
import { colors } from '@/styles/variables'
import ChevronUpSvg from '@/components/svg/ChevronUpSvg'
import { useAppContext } from '@/context/state'
import YourReviewForm from '@/components/for_pages/LkPage/ReceivingPoint/Cards/ReviewsCard/Forms/YourReview'
//import Formatter from '@/utils/formatter'



interface Props {

}

export default function ReviewCard(props: Props) {

  const [active, setActive] = useState<boolean>(false)

  const appContext = useAppContext()

  return (
    <CardLayout titleClassName={styles.title} topClassName={styles.additional} title={'Отзыв о сотрудничестве'}
      toggleEl={active ? <ChevronUpSvg onClick={() => setActive(false)} className={styles.chevron} color={colors.grey500} /> :
        <ChevronDownSvg onClick={() => setActive(true)} className={styles.chevron} color={colors.grey500} />}
      additionalEl={
        <div className={styles.additional}>
          <div className={styles.date}>
            {/*Formatter.formatDateRelative(props.offer.createdAt as string)*/}21 октября
          </div>
        </div>}>
      {active &&
        <div className={styles.root}>
          <YourReviewForm />
        </div>}
    </CardLayout>
  )
}
