import RoadMap1Svg from '@/components/svg/landing/roadmap/RoadMap1Svg'
import styles from './index.module.scss'
import RoadMap2Svg from '@/components/svg/landing/roadmap/RoadMap2Svg'
import RoadMap3Svg from '@/components/svg/landing/roadmap/RoadMap3Svg'
import RoadMap4Svg from '@/components/svg/landing/roadmap/RoadMap4Svg'
import RoadMap5Svg from '@/components/svg/landing/roadmap/RoadMap5Svg'
import RoadMap6Svg from '@/components/svg/landing/roadmap/RoadMap6Svg'
import RoadMapSvg from '@/components/svg/landing/roadmap/RoadMapSvg'

interface Props {

}

export default function Roadmap(props: Props) {

  return (
    <div className={styles.root} id='roadmap'>
      <div className={styles.container}>
        <div className={styles.title}>
          <span>Планы на будущее.</span> Roadmap
        </div>
        <div className={styles.row}>
          <div className={styles.column}>
            <div className={styles.item}>
              <RoadMap1Svg />
              <p>Подключение сервиса «Логистика», привлечение внешних перевозчиков</p>
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.item}>
              <RoadMap2Svg />
              <p>Внедрение платёжного сервиса и отчётности</p>
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.item}>
              <RoadMap3Svg />
              <p>Вывод сервиса в регионы РФ</p>
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.item}>
              <RoadMap4Svg />
              <p>Модернизация сервиса на базе полученного опыта</p>
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.item}>
              <RoadMap5Svg />
              <p>Вывод сервиса в Украине и Казахстане</p>
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.item}>
              <RoadMap6Svg />
              <p>Масштабирование сервиса в других странах</p>
            </div>
          </div>
          <div className={styles.column}>
            <div>
              <RoadMapSvg className={styles.illustration} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
