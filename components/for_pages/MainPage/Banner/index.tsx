import Button from '@/components/ui/Button'
import styles from './index.module.scss'

export default function Banner() {
  return (
    <div className={styles.root}>
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
