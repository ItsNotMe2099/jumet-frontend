import styles from './index.module.scss'
import IPointData from '@/data/interfaces/IPointData'
import QuestionPopover from '@/components/ui/QuestionPopover'
import CardLayout from '../../../CardLayout'
import { useState } from 'react'
import ChevronLeftSvg from '@/components/svg/ChevronLeftSvg'
import { colors } from '@/styles/variables'
import ChevronRightSvg from '@/components/svg/ChevronRightSvg'

interface Props {
  item: IPointData
  additionalEl?: React.ReactNode
  topClassName?: string
  button?: React.ReactNode
  cardLayoutClass?: string
}

export default function CostCardLk({ item, additionalEl, topClassName, button, cardLayoutClass }: Props) {

  const secondTableFirstRow = [
    { label: <>Вес лома</> },
    { label: <>От 1 до 5 тонн</> },
    { label: <>До 5 до 10 тонн</> },
    { label: <>От 10 до 50 тонн</> },
  ]

  const secondTableSecondRow = [
    { label: <>Цена за тонну</> },
    { label: <>23 000 ₽/т</> },
    { label: <>24 000 ₽/т</> },
    { label: <>25 000 ₽/т</> },
  ]

  const [activeOption, setActiveOption] = useState<number>(1)

  return (
    <CardLayout className={cardLayoutClass} title='Стоимость приема лома' additionalEl={additionalEl} topClassName={topClassName}>
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
        <div className={styles.mobile}>
          {secondTableFirstRow.slice(0, 1).map((i, index) =>
            <div key={index} className={styles.cell}>
              {i.label}
            </div>
          )}
          {secondTableFirstRow.slice(1).map((i, index) =>
            index + 1 === activeOption &&
            <div key={index} className={styles.cell}>
              <div className={styles.inner}>
                <div className={styles.label}>{i.label}</div>
                <div className={styles.controls}>
                  <ChevronLeftSvg onClick={() => index !== 0 && setActiveOption(index + 1 - 1)} 
                  className={styles.chevron} color={index !== 0 ? colors.grey500 : colors.grey400} />
                  <ChevronRightSvg onClick={() => index + 1 !== secondTableFirstRow.slice(1).length && setActiveOption(index + 1 + 1)} 
                  className={styles.chevron} color={index + 1 !== secondTableFirstRow.slice(1).length ? colors.grey500 : colors.grey400} />
                </div>
              </div>
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
        <div className={styles.mobileSecond}>
          {secondTableSecondRow.slice(0, 1).map((i, index) =>
            <div key={index} className={styles.cell}>
              {i.label}
            </div>
          )}
          {secondTableSecondRow.slice(1).map((i, index) =>
            index + 1 === activeOption &&
            <div key={index} className={styles.cell}>
              {i.label}
            </div>
          )}
        </div>
      </div>
      {button}
    </CardLayout>
  )
}