import { ProfileMenuSettings } from '@/types/enums'
import styles from './index.module.scss'
import IPointData from '@/data/interfaces/IPointData'
import Link from 'next/link'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import ChevronLeftSvg from '@/components/svg/ChevronLeftSvg'
import { colors } from '@/styles/variables'



interface Props {
  point: IPointData
  children: React.ReactNode
  className?: string
}

export default function LkLayoutMobile({ point, children, className }: Props) {

  const router = useRouter()

  const items = [
    {
      text: 'Информация о пункте приема', value: 'info',
      link: `/lk/${ProfileMenuSettings.ReceivingPoints}/${point.id}/info`
    },
    {
      text: 'Сотрудники пункта приёма', value: 'employees',
      link: `/lk/${ProfileMenuSettings.ReceivingPoints}/${point.id}/employees`
    },
    {
      text: 'Отзывы о пункте приёма', value: 'reviews',
      link: `/lk/${ProfileMenuSettings.ReceivingPoints}/${point.id}/reviews`
    },
    {
      text: 'Статистика пункта приёма', value: 'reviews',
      link: `/lk/${ProfileMenuSettings.ReceivingPoints}/${point.id}/statistic`
    },
  ]

  return (
    <div className={classNames(styles.root, className)}>
      <Link className={styles.back} href={`/lk/${ProfileMenuSettings.ReceivingPoints}`}>
        <ChevronLeftSvg color={colors.grey500} />
        <div className={styles.text}>
          Пункты приёма компании<br />{point.title}
        </div>
      </Link>
      <div className={styles.address}>
        {point.address}
      </div>
      <div className={styles.menu}>
        {items.map((i, index) =>
          <Link
            href={i.link}
            key={index}
            className={classNames(styles.option, {
              [styles.active]: router.asPath === i.link,
            })}>
            <span>{i.text}</span>
          </Link>
        )}
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
}
