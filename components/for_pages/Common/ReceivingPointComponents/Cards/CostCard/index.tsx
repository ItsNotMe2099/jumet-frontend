import Switch from '@/components/ui/Switch'
import styles from './index.module.scss'
import IPointData from '@/data/interfaces/IPointData'
import { useState } from 'react'
import QuestionPopover from '@/components/ui/QuestionPopover'
import CardLayout from '../../../CardLayout'
import ChevronLeftSvg from '@/components/svg/ChevronLeftSvg'
import ChevronRightSvg from '@/components/svg/ChevronRightSvg'
import { colors } from '@/styles/variables'

interface Props {
  item: IPointData
  cardLayoutClass?: string
  cardLayoutTitleClass?: string
}

export default function CostCard({ item, cardLayoutClass, cardLayoutTitleClass }: Props) {

  const [prices3A, setPrices3A] = useState<boolean>(true)
  const [prices5A, setPrices5A] = useState<boolean>(true)

  const firstTableFirstRow = [
    { label: <>Самовывоз<br className={styles.br} /> продавцом</> },
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
    { label: <>Самовывоз<br className={styles.br} /> продавцом</> },
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

  const [activeOption, setActiveOption] = useState<number>(1)

  return (
    <CardLayout className={cardLayoutClass} titleClassName={cardLayoutTitleClass} title='Стоимость приема лома'>
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
          <div className={styles.mobile}>
            {firstTableFirstRow.slice(0, 1).map((i, index) =>
              <div key={index} className={styles.cell}>
                {i.label}
              </div>
            )}
            {firstTableFirstRow.slice(1).map((i, index) =>
              index + 1 === activeOption &&
              <div key={index} className={styles.cell}>
                <div className={styles.inner}>
                  <div className={styles.label}>{i.label}</div>
                  <div className={styles.controls}>
                    <ChevronLeftSvg onClick={() => index !== 0 && setActiveOption(index + 1 - 1)}
                      className={styles.chevron} color={index !== 0 ? colors.grey500 : colors.grey400} />
                    <ChevronRightSvg onClick={() => index + 1 !== firstTableFirstRow.slice(1).length && setActiveOption(index + 1 + 1)}
                      className={styles.chevron} color={index + 1 !== firstTableFirstRow.slice(1).length ? colors.grey500 : colors.grey400} />
                  </div>
                </div>
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
          <div className={styles.mobileSecond}>
            {firstTableSecondRow.slice(0, 1).map((i, index) =>
              <div key={index} className={styles.cell}>
                {i.label}
              </div>
            )}
            {firstTableSecondRow.slice(1).map((i, index) =>
              index + 1 === activeOption &&
              <div key={index} className={styles.cell} style={{ paddingLeft: '24px' }}>
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
          <div className={styles.whiteRow}>
            {secondTableThirdRow.map((i, index) =>
              <div key={index} className={styles.cell}>
                {i.label}
              </div>
            )}
          </div>
          <div className={styles.mobileWhite}>
            {secondTableThirdRow.slice(0, 1).map((i, index) =>
              <div key={index} className={styles.cell}>
                {i.label}
              </div>
            )}
            {secondTableThirdRow.slice(1).map((i, index) =>
              index + 1 === activeOption &&
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
          <div className={styles.mobileSecond}>
            {secondTableFourthRow.slice(0, 1).map((i, index) =>
              <div key={index} className={styles.cell}>
                {i.label}
              </div>
            )}
            {secondTableFourthRow.slice(1).map((i, index) =>
              index + 1 === activeOption &&
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
          <div className={styles.mobileWhite}>
            {secondTableFifthRow.slice(0, 1).map((i, index) =>
              <div key={index} className={styles.cell}>
                {i.label}
              </div>
            )}
            {secondTableFifthRow.slice(1).map((i, index) =>
              index + 1 === activeOption &&
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