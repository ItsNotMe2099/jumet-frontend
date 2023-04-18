import Button from '@/components/ui/Button'
import styles from './index.module.scss'
import Image from 'next/image'

export default function Banner() {
  return (
    <div className={styles.root}>
      <Image src={'/img/Banner/bg.png'} alt='' fill />
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
