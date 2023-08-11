import styles from 'components/for_pages/LkPage/DealEdit/components/ReviewResultCard/index.module.scss'
import DealStepResultCardLayout from '@/components/for_pages/LkPage/DealEdit/components/DealStepResultCardLayout'
import {useDealContext} from '@/context/deal_state'
import ReviewCard from '@/components/for_pages/Common/Cards/ReviewCard'
import {useAppContext} from '@/context/state'
import {UserRole} from '@/data/enum/UserRole'

//import Formatter from '@/utils/formatter'



interface Props {

}

export default function ReviewResultCard(props: Props) {
  const appContext = useAppContext()
  const dealContext = useDealContext()
  return (
    <DealStepResultCardLayout title={'Отзыв о сотрудничестве'} date={dealContext.deal!.review!.createdAt}>
      <div className={styles.root}>
        <ReviewCard showAnswerForm={appContext.aboutMe?.role === UserRole.Buyer} item={dealContext.deal!.review!}/>
      </div>
    </DealStepResultCardLayout>

  )
}
