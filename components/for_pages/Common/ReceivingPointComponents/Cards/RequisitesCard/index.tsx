import Button from '@/components/ui/Button'
import styles from './index.module.scss'
import IPointData from '@/data/interfaces/IPointData'
import FileDownloadSvg from '@/components/svg/FileDownloadSvg'
import { colors } from '@/styles/variables'
import CardLayout from '../../../CardLayout'
import classNames from 'classnames'


interface Props {
  item: IPointData
  additionalEl?: React.ReactNode
  topClassName?: string
  cardLayoutClass?: string
  button?: React.ReactNode
}

export default function RequisitesCard({ item, additionalEl, topClassName, cardLayoutClass, button }: Props) {

  return (
    <CardLayout
      title='Реквизиты'
      className={classNames(styles.root, cardLayoutClass)}
      additionalEl={additionalEl}
      topClassName={topClassName}>
      <div className={styles.item}>
        <div className={styles.title}>
          ИНН
        </div>
        <div className={styles.value}>
          {item.inn}
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.title}>
          Юр. лицо
        </div>
        <div className={styles.value}>
          {item.entity}
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.title}>
          ОГРН
        </div>
        <div className={styles.value}>
          {item.ogrn}
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.title}>
          Юридический адрес
        </div>
        <div className={styles.value}>
          {item.legalAddress}
        </div>
      </div>
      <div className={styles.bottom}>
        <Button href={item.license} className={styles.btn} styleType='large' color='grey'>
          <FileDownloadSvg color={colors.blue500} />
        </Button>
        <div className={styles.text}>
          Лицензия ломозаготовителя
        </div>
      </div>
      {button}
    </CardLayout>
  )
}