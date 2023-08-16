import {useAppContext} from '@/context/state'
import styles from './index.module.scss'
import classNames from 'classnames'
import {ReactElement} from 'react'
import {LkLayoutWrapper, useLkLayoutContext} from '@/context/lk_layout_content'
import {UserRole} from '@/data/enum/UserRole'
import VisibleXs from '@/components/visibility/VisibleXs'
import BackButton from '@/components/ui/BackButton'
import {useRouter} from 'next/router'
import {Routes} from '@/types/routes'
import LkBuyerMenu from '@/components/for_pages/LkPage/layout/LkBuyerMenu'
import LkSellerMenu from '@/components/for_pages/LkPage/layout/LkSellerMenu'
import LkStatsMenu from '@/components/for_pages/LkPage/layout/LkStatsMenu'


interface Props {
  children: React.ReactNode
  menu?: ReactElement | null
  className?: string
}


const LkLayoutInner = (props: Props) => {
  const appContext = useAppContext()
  const lkLayoutContext = useLkLayoutContext()

  const router = useRouter()

  console.log(router)

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
  const router = useRouter()
  const getMenu = () => {
    if(router.asPath.startsWith(Routes.lkCrm)){
      return <LkStatsMenu/>
    }
    if(appContext.aboutMe?.role === UserRole.Buyer){
      return <LkBuyerMenu />
    }
    if(appContext.aboutMe?.role === UserRole.Seller){
      return <LkSellerMenu />
    }
    return null
  }

  return <LkLayoutWrapper>
   <LkLayoutInner menu={getMenu()}>{props.children}</LkLayoutInner>
  </LkLayoutWrapper>
}

