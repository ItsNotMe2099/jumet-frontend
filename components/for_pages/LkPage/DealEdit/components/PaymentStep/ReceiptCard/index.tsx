import CardLayout from '@/components/for_pages/Common/CardLayout'
import styles from './index.module.scss'
import { useState } from 'react'
import ChevronDownSvg from '@/components/svg/ChevronDownSvg'
import { colors } from '@/styles/variables'
import ChevronUpSvg from '@/components/svg/ChevronUpSvg'
import FileDownload from '@/components/ui/FileDownload'
//import Formatter from '@/utils/formatter'



interface Props {

}

export default function ReceiptCard(props: Props) {

  const [active, setActive] = useState<boolean>(false)

  return (
    <CardLayout titleClassName={styles.title} topClassName={styles.additional} title={'Квитанция об оплате'}
      toggleEl={active ? <ChevronUpSvg onClick={() => setActive(false)} className={styles.chevron} color={colors.grey500} /> :
        <ChevronDownSvg onClick={() => setActive(true)} className={styles.chevron} color={colors.grey500} />}
      additionalEl={
        <div className={styles.additional}>
          <div className={styles.date}>
            {/*Formatter.formatDateRelative(props.offer.createdAt as string)*/}21 октября
          </div>
        </div>}>
      {active &&
        <div className={styles.root}>
          <div className={styles.item}>
            <div className={styles.top}>
              Дата оплаты
            </div>
            <div className={styles.bottom}>
              28.05.2023 г.
            </div>
          </div>
          <FileDownload href='' label='Квитанция об оплате' />
        </div>}
    </CardLayout>
  )
}
