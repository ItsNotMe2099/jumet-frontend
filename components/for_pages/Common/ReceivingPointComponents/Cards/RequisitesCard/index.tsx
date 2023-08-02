import Button from '@/components/ui/Button'
import styles from './index.module.scss'
import FileDownloadSvg from '@/components/svg/FileDownloadSvg'
import { colors } from '@/styles/variables'
import CardLayout from '../../../CardLayout'
import classNames from 'classnames'
import { IReceivingPoint } from '@/data/interfaces/IReceivingPoint'


interface Props {
  item: IReceivingPoint
  additionalEl?: React.ReactNode
  topClassName?: string
  cardLayoutClass?: string
  button?: React.ReactNode
  cardLayoutTitleClass?: string
}

export default function
  RequisitesCard({ item, additionalEl, topClassName, cardLayoutClass, button, cardLayoutTitleClass }: Props) {

  return (
    <CardLayout
      title='Реквизиты'
      className={classNames(styles.root, cardLayoutClass)}
      titleClassName={cardLayoutTitleClass}
      additionalEl={additionalEl}
      topClassName={topClassName}>
      <div className={styles.item}>
        <div className={styles.title}>
          ИНН
        </div>
        <div className={styles.value}>
          {item.company.inn}
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.title}>
          Юр. лицо
        </div>
        <div className={styles.value}>
          {item.company.name}
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.title}>
          ОГРН
        </div>
        <div className={styles.value}>
          {item.company.ogrn}
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.title}>
          Юридический адрес
        </div>
        <div className={styles.value}>
          {item.company.legalAddress}
        </div>
      </div>
      <div className={styles.bottom}>
        <Button className={styles.btn} styleType='large' color='grey'>
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