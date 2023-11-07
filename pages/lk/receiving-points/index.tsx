import styles from './index.module.scss'
import {useRouter} from 'next/router'
import {useReceivingPointListContext} from '@/context/receiving_point_list_state'
import {getAuthServerSideProps} from '@/utils/auth'
import {UserRole} from '@/data/enum/UserRole'
import ReceivingPointCard from '@/components/for_pages/LkPage/Cards/ReceivingPointCard'
import {LkPageLayout} from '@/pages/lk'
import {LkLayoutActionsData, LkLayoutTitleData} from '@/context/lk_layout_content'
import {useAppContext} from '@/context/state'
import CreateButton from '@/components/ui/Buttons/CreateButton'
import {Routes} from '@/types/routes'

interface Props {

}

const ReceivingPointsPage = (props: Props) => {
  const appContext = useAppContext()
  const router = useRouter()
  const receivingPointListContext = useReceivingPointListContext()
  return (
    <div className={styles.root}>
      <LkLayoutTitleData title={'Пункты приема'}/>
      <LkLayoutActionsData actions={[ <CreateButton href={Routes.lkReceivingPointCreate} fluid={appContext.isMobile} >
        Добавить пункт приёма
      </CreateButton>
      ]}/>
      {receivingPointListContext.items.map((i, index) =>
        <ReceivingPointCard item={i} key={i.id} href={`${router.asPath}/${i.id}/info`}/>
      )}
    </div>
  )
}
ReceivingPointsPage.getLayout = LkPageLayout
export default ReceivingPointsPage

export const getServerSideProps = getAuthServerSideProps(UserRole.Buyer)
