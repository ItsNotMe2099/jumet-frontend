import Button from '@/components/ui/Button'
import styles from './index.module.scss'
import Image from 'next/image'
import classNames from 'classnames'
import HiddenXs from '@/components/visibility/HiddenXs'
import VisibleXs from '@/components/visibility/VisibleXs'
import RussiaSvg from '@/components/svg/RussiaSvg'
import Russia2Svg from '@/components/svg/Russia2Svg'
import {Routes} from '@/types/routes'

interface Props {
  className?: string
}

export default function Banner(props: Props) {

  return (
    <div className={classNames(styles.root, props.className)}>
      <HiddenXs>
        <>
          <Image className={styles.bg} src={'/img/banner/bg.png'} alt='' fill />
          <RussiaSvg className={styles.russia} />
        </>
      </HiddenXs>
      <VisibleXs>
        <>
          <Image className={styles.bgPhone} src={'/img/banner/bg-phone.png'} alt='' fill />
          <Russia2Svg className={styles.russia2} />
        </>
      </VisibleXs>
      <div className={styles.top}>
        Нет времени искать пункт приёма?
      </div>
      <div className={styles.middle}>
        Создайте заявку на продажу лома и получите<HiddenXs><br /></HiddenXs>предложения от разных покупателей
      </div>
      <Button className={styles.btn} href={Routes.createSalesApplication} styleType='large' color='white'>
        Продать лом
      </Button>
    </div>
  )
}
