import Link from 'next/link'
import styles from './index.module.scss'
import LogoSvg from '@/components/svg/LogoSvg'
import { colors } from '@/styles/variables'
import useIsActiveLink from '@/components/hooks/useIsActiveLink'
import classNames from 'classnames'
import NotificationBadge from '@/components/ui/NotificationBadge'
import Button from '@/components/ui/Button'
import { Routes } from '@/types/routes'
import FooterSvg from '@/components/svg/landing/footer/FooterSvg'
import { CONTACTS, LINKS } from '@/types/constants'
import VKSvg from '@/components/svg/landing/footer/VKSvg'
import FBSvg from '@/components/svg/landing/footer/FBSvg'
import InstagramSvg from '@/components/svg/landing/footer/InstagramSvg'
import YoutubeSvg from '@/components/svg/landing/footer/YoutubeSvg'
import { format } from 'date-fns'
import UpSvg from '@/components/svg/landing/footer/UpSvg'
import { useRouter } from 'next/router'

interface Props {

}

interface IMenuOption { link: string, label: string, badge?: number | null }

export default function FooterLanding(props: Props) {

  const MenuItem = (props: IMenuOption) => {
    const isActive = useIsActiveLink(props.link ?? '')
    return (<Link className={classNames(styles.link, { [styles.active]: isActive })} href={props.link}>
      {props.label}
      {(props.badge ?? 0) > 0 && <NotificationBadge color={'blue'} total={props.badge!} />}
    </Link>)
  }

  const router = useRouter()

  const menuLanding: IMenuOption[] = [
    { link: '/landing/#how-it-works', label: 'Как работает' },
    { link: '/landing/#benefits', label: 'Выгоды' },
    { link: '/landing/#advantages', label: 'Приемущества' },
    { link: '/landing/#how-to-connects', label: 'Как подключиться' },
    { link: '/landing/#roadmap', label: 'Roadmap' },
    { link: '/landing/#contacts', label: 'Контакты' },
  ]

  console.log(router)

  return (
    <div className={styles.root} id={'footer'}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Link href={'/'}>
            <LogoSvg className={styles.logo} colorFirst={colors.yellow500} colorSecond={colors.white} />
          </Link>
          <div className={styles.info}>
            Онлайн-сервис продажи и покупки лома
          </div>
        </div>
        <div className={styles.middle}>
          {menuLanding.map((i, index) =>
            <MenuItem key={index} link={i.link} label={i.label} badge={i.badge ?? 0} />
          )}
        </div>
        <Button href={Routes.registration} className={styles.btn} styleType='large' color='blue'>
          Купить/Продать лом
        </Button>
      </div>
      <div className={styles.contacts}>
        <FooterSvg />
        <div className={styles.socials}>
          <div className={styles.phone}>
            {CONTACTS.tel}
          </div>
          <div className={styles.icons}>
            <a href={LINKS.vk}>
              <VKSvg />
            </a>
            <a href={LINKS.fb}>
              <FBSvg />
            </a>
            <a href={LINKS.instagram}>
              <InstagramSvg />
            </a>
            <a href={LINKS.youtube}>
              <YoutubeSvg />
            </a>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.copyright}>
          © {format(new Date(), 'yyyy')} г. Все права защищены
        </div>
        <Link href={`${router.pathname}/#top`}>
          <div className={styles.up}>
            <div>Наверх</div>
            <UpSvg />
          </div>
        </Link>
      </div>
    </div>
  )
}
