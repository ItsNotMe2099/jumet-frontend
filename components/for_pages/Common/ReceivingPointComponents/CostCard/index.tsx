import Switch from '@/components/ui/Switch'
import styles from './index.module.scss'
import IPointData from '@/data/interfaces/IPointData'
import { useState } from 'react'
import QuestionPopover from '@/components/ui/QuestionPopover'
import CardLayout from '../../CardLayout'

interface Props {
  item: IPointData
}

export default function CostCard({ item }: Props) {

  const [prices3A, setPrices3A] = useState<boolean>(true)
  const [prices5A, setPrices5A] = useState<boolean>(true)

  const firstTableFirstRow = [
    { label: <>Самовывоз продавцом</> },
    { label: <>Зона доставки 1<br /> От 1 до 20 км</> },
    { label: <>Зона доставки 2<br /> От 20 до 50 км</> },
    { label: <>Зона доставки 3<br /> От 50 до 100 км</> },
    { label: <>Зона доставки 4<br /> От 100 до 500 км</> },
    { label: <>Зона доставки 5<br /> От 500 до 1000 км</> },
  ]

  const firstTableSecondRow = [
    { label: <>23 000 ₽/т</> },
    { label: <>23 000 ₽/т</> },
    { label: <>23 000 ₽/т</> },
    { label: <>23 000 ₽/т</> },
    { label: <>23 000 ₽/т</> },
    { label: <>23 000 ₽/т</> },
  ]

  const secondTableFirstRow = [
    { label: <>Вес лома</> },
    { label: <>Самовывоз продавцом</> },
    { label: <>Зона доставки 1<br /> От 1 до 20 км</> },
    { label: <>Зона доставки 2<br /> От 20 до 50 км</> },
    { label: <>Зона доставки 3<br /> От 50 до 100 км</> },
    { label: <>Зона доставки 4<br /> От 100 до 500 км</> },
    { label: <>Зона доставки 5<br /> От 500 до 1000 км</> },
  ]

  const secondTableSecondRow = [
    { label: <>До 1 тонны</> },
    { label: <>23 000 ₽/т</> },
    { label: <>23 000 ₽/т</> },
    { label: <>23 000 ₽/т</> },
    { label: <>23 000 ₽/т</> },
    { label: <>23 000 ₽/т</> },
    { label: <>23 000 ₽/т</> },
  ]

  const secondTableThirdRow = [
    { label: <>От 1 до 5 тонн</> },
    { label: <>23 000 ₽/т</> },
    { label: <>23 000 ₽/т</> },
    { label: <>23 000 ₽/т</> },
    { label: <>23 000 ₽/т</> },
    { label: <>23 000 ₽/т</> },
    { label: <>23 000 ₽/т</> },
  ]

  const secondTableFourthRow = [
    { label: <>От 5 до 10 тонн</> },
    { label: <>23 000 ₽/т</> },
    { label: <>23 000 ₽/т</> },
    { label: <>23 000 ₽/т</> },
    { label: <>23 000 ₽/т</> },
    { label: <>23 000 ₽/т</> },
    { label: <>23 000 ₽/т</> },
  ]

  const secondTableFifthRow = [
    { label: <>От 10 до 50 тонн</> },
    { label: <>23 000 ₽/т</> },
    { label: <>23 000 ₽/т</> },
    { label: <>23 000 ₽/т</> },
    { label: <>23 000 ₽/т</> },
    { label: <>23 000 ₽/т</> },
    { label: <>23 000 ₽/т</> },
  ]

  return (
    <CardLayout title='Стоимость приема лома'>
      <div className={styles.top}>
        <div className={styles.category}>
          <div className={styles.popover}>
            <div className={styles.text}>
              Лом категории 3A
            </div>
            <QuestionPopover info='test' />
          </div>
          <div className={styles.switch}>
            <Switch checked={prices3A} onChange={() => setPrices3A(!prices3A)} />
            <div className={styles.text}>Цены за вычетом засора</div>
          </div>
        </div>
        <div className={styles.table}>
          <div className={styles.row}>
            {firstTableFirstRow.map((i, index) =>
              <div key={index} className={styles.cell}>
                {i.label}
              </div>
            )}
          </div>
          <div className={styles.secondRow}>
            {firstTableSecondRow.map((i, index) =>
              <div key={index} className={styles.cell}>
                {i.label}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.top}>
        <div className={styles.category}>
          <div className={styles.popover}>
            <div className={styles.text}>
              Лом категории 5A
            </div>
            <QuestionPopover info='test' />
          </div>
          <div className={styles.switch}>
            <Switch checked={prices5A} onChange={() => setPrices5A(!prices5A)} />
            <div className={styles.text}>Цены за вычетом засора</div>
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
          <div className={styles.whiteRow}>
            {secondTableThirdRow.map((i, index) =>
              <div key={index} className={styles.cell}>
                {i.label}
              </div>
            )}
          </div>
          <div className={styles.secondRow}>
            {secondTableFourthRow.map((i, index) =>
              <div key={index} className={styles.cell}>
                {i.label}
              </div>
            )}
          </div>
          <div className={styles.whiteRow}>
            {secondTableFifthRow.map((i, index) =>
              <div key={index} className={styles.cell}>
                {i.label}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.top}>
        <div className={styles.category}>
          <div className={styles.popover}>
            <div className={styles.text}>
              Лом категории Mix
            </div>
            <QuestionPopover info='test' />
          </div>
        </div>
        <div className={styles.mix}>
          <div className={styles.self}>
            Самовывоз продавцом
          </div>
          <div className={styles.price}>
            23 000 ₽/т
          </div>
        </div>
      </div>
    </CardLayout>
  )
}