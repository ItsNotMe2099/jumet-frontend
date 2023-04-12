import Link from 'next/link'
import styles from './index.module.scss'
import Button from '@/components/ui/Button'
import UserSvg from '@/components/svg/UserSvg'
import { colors } from '@/styles/variables'

interface Props {

}

export default function Header(props: Props) {

  const menuNotAuth = [
    { link: '', label: 'Пункты приёма лома' },
    { link: '', label: 'Купить лом' },
  ]

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.logo}>
            jumet
          </div>
          <div className={styles.info}>
            Онлайн-сервис продажи<br /> и покупки лома
          </div>
        </div>
        <div className={styles.middle}>
          {menuNotAuth.map((i, index) =>
            <Link key={index} className={styles.link} href={i.link}>
              {i.label}
            </Link>
          )}
        </div>
        <div className={styles.right}>
          <Button className={styles.btn} styleType='large' color='dark'>
            <UserSvg color={colors.white} />
            <div>Войти</div>
          </Button>
          <Button className={styles.btn} styleType='large' color='blue'>
            Зарегистрироваться
          </Button>
        </div>
      </div>
    </div>
  )
}
