import Link from 'next/link'
import styles from './index.module.scss'
import Button from '@/components/ui/Button'
import UserSvg from '@/components/svg/UserSvg'
import {colors} from '@/styles/variables'
import {forwardRef} from 'react'
import {Sticky} from 'react-sticky'
import HiddenXs from '@/components/visibility/HiddenXs'
import MenuSvg from '@/components/svg/MenuSvg'
import CloseSvg from '@/components/svg/CloseSvg'
import {useAppContext} from '@/context/state'
import {ModalType} from '@/types/enums'
import {Routes} from '@/types/routes'
import {UserRole} from '@/data/enum/UserRole'
import IconButton from '@/components/ui/IconButton'
import ChatSvg from '@/components/svg/ChatSvg'
import BookmarkSvg from '@/components/svg/BookmarkSvg'
import ProfileMenu from '@/components/layout/Header/ProfileMenu'
import useIsActiveLink from '@/components/hooks/useIsActiveLink'
import classNames from 'classnames'

interface Props {
  isSticky?: boolean
  restProps?: any
}

const MenuItem = (props: { link: string, label: string }) => {
  const isActive = useIsActiveLink(props.link ?? '')
  return (<Link className={classNames(styles.link, {[styles.active]: isActive})} href={props.link}>
    {props.label}
  </Link>)
}


const HeaderInner = forwardRef<HTMLDivElement, Props & { style?: any, distanceFromTop?: number }>((props, ref) => {

  const appContext = useAppContext()

  const menuNotAuth = [
    {link: Routes.receivingPoints, label: 'Пункты приёма лома'},
    {link: Routes.saleRequests, label: 'Лом на продажу'},

  ]

  const menuAuth = appContext.aboutMe?.role === UserRole.Seller ? [
    {link: Routes.receivingPoints, label: 'Пункты приёма лома'},
    {link: Routes.lkSaleRequests, label: 'Мои заявки на продажу'},
    {link: Routes.lkDeals, label: 'Сделки'},
  ] : [
    {link: Routes.saleRequests, label: 'Лом на продажу'},
    {link: Routes.lkDealOffers, label: 'Предложения лома'},
    {link: Routes.lkDeals, label: 'Сделки'},
  ]

  const handleOpenMobileMenu = () => {

    appContext.showModal(ModalType.MobileMenu)
  }

  const handleCloseMobileMenu = () => {

    appContext.hideModal()
  }

  return (
    <div className={styles.root} ref={ref} style={props.style} {...(props.restProps ?? {})} id={'header'}>
      <div className={styles.container}>
        <div className={styles.left}>
          <Link href={'/'} className={styles.logo}>
            jumet
          </Link>
          <div className={styles.info}>
            Онлайн-сервис продажи<br/> и покупки лома
          </div>
        </div>
        <div className={styles.middle}>
          {(appContext.isLogged ? menuAuth : menuNotAuth).map((i, index) =>
            <MenuItem key={index} className={styles.link} link={i.link} label={i.label}/>
          )}
        </div>
        <HiddenXs>
          <div className={styles.right}>
            {appContext.isLogged && <div className={styles.userButtons}>
              <IconButton href={Routes.lkChat()} bgColor={'dark400'}><ChatSvg color={colors.white}/></IconButton>
              <IconButton href={Routes.lkFavorites} bgColor={'dark400'}><BookmarkSvg color={colors.white}/></IconButton>
              <ProfileMenu/>
            </div>}
            {appContext.isLogged && appContext.aboutMe?.role === UserRole.Buyer &&
              <Button href={Routes.saleRequests} className={styles.btn} styleType='large' color='blue'>
                Купить лом
              </Button>}
            {appContext.isLogged && appContext.aboutMe?.role === UserRole.Seller &&
              <Button href={Routes.lkSaleRequestCreate} className={styles.btn} styleType='large' color='blue'>
                Продать лом
              </Button>}
            {!appContext.isLogged && <>
              <Button href={Routes.login()} className={styles.btn} styleType='large' color='dark'>
                <UserSvg color={colors.white}/>
                <div>Войти</div>
              </Button>
              <Button href={Routes.registration} className={styles.btn} styleType='large' color='blue'>
                Зарегистрироваться
              </Button>
            </>}
          </div>
        </HiddenXs>
        <div className={styles.mobile}>
          {appContext.modal === ModalType.MobileMenu ?
            <div className={styles.menu} onClick={handleCloseMobileMenu}>
              <CloseSvg color={colors.white}/>
            </div>
            :
            <div className={styles.menu} onClick={handleOpenMobileMenu}>
              <MenuSvg color={colors.white}/>
            </div>
          }
        </div>
      </div>
    </div>
  )

})

HeaderInner.displayName = 'HeaderInner'
export default function Header(props: Props) {

  if (props.isSticky) {
    return <Sticky>{({style, isSticky, ...rest}) => <HeaderInner {...props} restProps={rest} style={style}/>}</Sticky>
  } else {
    return <HeaderInner {...props} />
  }
}
