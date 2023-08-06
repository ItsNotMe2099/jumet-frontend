import {useAppContext} from '@/context/state'
import styles from './index.module.scss'
import classNames from 'classnames'
import {ReactElement} from 'react'
import {LkLayoutWrapper, useLkLayoutContext} from '@/context/lk_layout_content'
import {UserRole} from '@/data/enum/UserRole'
import {ReceivingPointListWrapper, useReceivingPointListContext} from '@/context/receiving_point_list_state'
import LkMenu from '@/components/for_pages/LkPage/layout/LkMenu'
import VisibleXs from '@/components/visibility/VisibleXs'
import BackButton from '@/components/ui/BackButton'


interface Props {
  children: React.ReactNode
  menu?: ReactElement
  className?: string
}
const LKBuyerMenu = () =>{
  const receivingListContext = useReceivingPointListContext()
  return <LkMenu receivingPoints={receivingListContext.items}/>
}

const LkLayoutInner = (props: Props) => {
  const appContext = useAppContext()
  const lkLayoutContext = useLkLayoutContext()

  return (
    <div className={classNames(styles.root, props.className)}>
      <VisibleXs>
        <>
        {lkLayoutContext.backTitle && <BackButton onClick={lkLayoutContext.onBackClick} href={lkLayoutContext.backHref}>{lkLayoutContext.backTitle ?? null}</BackButton>}
        </>
      </VisibleXs>
      <div className={styles.title}>
        {lkLayoutContext.title}
        {appContext.isDesktop && lkLayoutContext.actions}

      </div>
      <div className={styles.container}>
        <div className={styles.menu}>
          {props.menu}
        </div>

        {appContext.isMobile && lkLayoutContext.actions}
        <div className={styles.content}>
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default function LkLayout(props: Props) {
  const appContext = useAppContext()
  return <LkLayoutWrapper>
    {appContext.aboutMe?.role === UserRole.Buyer && <ReceivingPointListWrapper>
      <LkLayoutInner menu={<LKBuyerMenu/>}>{props.children}</LkLayoutInner>
    </ReceivingPointListWrapper>}
    {appContext.aboutMe?.role === UserRole.Seller && <LkLayoutInner>{props.children}</LkLayoutInner>}
  </LkLayoutWrapper>
}

