import styles from './index.module.scss'
import IPointData from '@/data/interfaces/IPointData'
import QuestionPopover from '@/components/ui/QuestionPopover'
import CardLayout from '../../CardLayout'

interface Props {
  item: IPointData
  additionalEl?: React.ReactNode
  topClassName?: string
}

export default function CostCardLk({ item, additionalEl, topClassName }: Props) {

  const secondTableFirstRow = [
    { label: <>Вес лома</> },
    { label: <>От 1 до 5 тонн</> },
    { label: <>До 5 до 10 тонн</> },
    { label: <>От 10 до 50 тонн</> },
  ]

  const secondTableSecondRow = [
    { label: <>Цена за тонну</> },
    { label: <>23 000 ₽/т</> },
    { label: <>23 000 ₽/т</> },
    { label: <>23 000 ₽/т</> },
  ]

  return (
    <CardLayout title='Стоимость приема лома' additionalEl={additionalEl} topClassName={topClassName}>
      <div className={styles.top}>
        <div className={styles.category}>
          <div className={styles.popover}>
            <div className={styles.text}>
              Лом категории 3A
            </div>
            <QuestionPopover info='test' />
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.top}>
            Засор
          </div>
          <div className={styles.bottom}>
            5%
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.top}>
            Цена за тонну
          </div>
          <div className={styles.bottom}>
            23 000 ₽
          </div>
        </div>
      </div>
      <div className={styles.topSecond}>
        <div className={styles.category}>
          <div className={styles.popover}>
            <div className={styles.text}>
              Лом категории 5A
            </div>
            <QuestionPopover info='test' />
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.top}>
            Засор
          </div>
          <div className={styles.bottom}>
            5%
          </div>
        </div>
      </div>
      <div className={styles.table}>
        <div className={styles.row}>
          {secondTableFirstRow.map((i, index) =>
            <div key={index} className={styles.cell}>
              {i.label}
            </div>
          )}
        </div>
        <div className={styles.secondRow}>
          {secondTableSecondRow.map((i, index) =>
            <div key={index} className={styles.cell}>
              {i.label}
            </div>
          )}
        </div>
      </div>
    </CardLayout>
  )
}