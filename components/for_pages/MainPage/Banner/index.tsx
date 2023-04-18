import Button from '@/components/ui/Button'
import styles from './index.module.scss'
import Image from 'next/image'
import classNames from 'classnames'
import HiddenXs from '@/components/visibility/HiddenXs'
import VisibleXs from '@/components/visibility/VisibleXs'

interface Props {
  className?: string
}

export default function Banner(props: Props) {

  return (
    <div className={classNames(styles.root, props.className)}>
      <HiddenXs>
        <Image src={'/img/Banner/bg.png'} alt='' fill />
      </HiddenXs>
      <VisibleXs>
        <Image src={'/img/Banner/bg-phone.png'} alt='' fill />
      </VisibleXs>
      <div className={styles.top}>
        Нет времени искать пункт приёма?
      </div>
      <div className={styles.middle}>
        Создайте заявку на продажу лома и получите<br /> предложения от разных покупателей
      </div>
      <Button className={styles.btn} styleType='large' color='white'>
        Продать лом
      </Button>
    </div>
  )
}
