import Image from 'next/image'
import styles from './index.module.scss'
import { ReactElement } from 'react-markdown/lib/react-markdown'
import Button from '@/components/ui/Button'
import { useAppContext } from '@/context/state'
import { ModalType } from '@/types/enums'
import { UserRole } from '@/data/enum/UserRole'

interface IStep {
  image: string
  desc: ReactElement
  role: UserRole
}

interface IItem {
  image: string
  name: string
  desc: ReactElement
  steps: IStep[]
}

interface Props {
  item: IItem
}

export default function Item({ item }: Props) {

  const appContext = useAppContext()

  return (
    <div className={styles.root}>
      <div className={styles.item}>
        <div className={styles.top}>
          <a onClick={() => appContext.showModal(ModalType.SwiperModal, item.steps)}>
            <Image src={item.image} alt='' fill />
          </a>
          <div className={styles.name}>{item.name}</div>
          {item.desc}
        </div>
        <div className={styles.bottom}>
          <Button onClick={() => appContext.showModal(ModalType.SwiperModal, item.steps)} className={styles.btn} styleType='large' color='blue'>
            Смотреть подробнее
          </Button>
        </div>
      </div>
    </div>
  )
}
