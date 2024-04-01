import Top1Svg from '@/components/svg/landing/top/Top1Svg'
import styles from './index.module.scss'
import Top3Svg from '@/components/svg/landing/top/Top3Svg'
import Top2Svg from '@/components/svg/landing/top/Top2Svg'

interface Props {

}

export default function Top(props: Props) {

  return (
    <div className={styles.root} id='top'>
      <div className={styles.title}>Онлайн-сервис продажи<br /> и покупки лома</div>
      <div className={styles.images}>
        <Top1Svg />
        <Top3Svg className={styles.middle} />
        <Top2Svg />
      </div>
    </div>
  )
}
