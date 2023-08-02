import styles from './index.module.scss'
import {ReactElement, useState} from 'react'
import ChevronLeftSvg from '@/components/svg/ChevronLeftSvg'
import {colors} from '@/styles/variables'
import ChevronRightSvg from '@/components/svg/ChevronRightSvg'
import {Nullable} from '@/types/types'

interface ITableCell {
  value?: Nullable<string | ReactElement>
  className?: Nullable<string>
}

interface ITableRow {
  className?: Nullable<string>
  cells: ITableCell[]
}

interface ITableHeaderRow extends ITableRow {

}

interface Props {
  headerRow: ITableHeaderRow
  data: ITableRow[]
}

export default function PricingTable(props: Props) {
  const [activeOption, setActiveOption] = useState<number>(1)

  return (
    <div className={styles.table}>
      <div className={styles.row}>
        {props.headerRow?.cells.map((i, index) =>
          <div key={index} className={styles.cell}>
            {i.value}
          </div>
        )}
      </div>
      <div className={styles.mobile}>
        {props.headerRow?.cells.slice(0, 1).map((i, index) =>
          <div key={index} className={styles.cell}>
            {i.value}
          </div>
        )}
        {props.headerRow?.cells.slice(1).map((i, index) =>
          index + 1 === activeOption &&
          <div key={index} className={styles.cell}>
            <div className={styles.inner}>
              <div className={styles.label}>{i.value}</div>
              <div className={styles.controls}>
                <ChevronLeftSvg onClick={() => index !== 0 && setActiveOption(index + 1 - 1)}
                                className={styles.chevron} color={index !== 0 ? colors.grey500 : colors.grey400}/>
                <ChevronRightSvg
                  onClick={() => index + 1 !== props.headerRow?.cells.slice(1).length && setActiveOption(index + 1 + 1)}
                  className={styles.chevron}
                  color={index + 1 !== props.headerRow?.cells.slice(1).length ? colors.grey500 : colors.grey400}/>
              </div>
            </div>
          </div>
        )}
      </div>
      {props.data.map((row) => <div className={styles.secondRow}>
        {row.cells.map((i, index) =>
          <div key={index} className={styles.cell}>
            {i.value}
          </div>
        )}
      </div>)}

      {props.data.map((row) => <div className={styles.mobileSecond}>
        {row.cells[0] && <div className={styles.cell}>
          {row.cells[0].value}
        </div>}
        {row.cells[activeOption] && <div className={styles.cell}>
          {row.cells[activeOption].value}
        </div>}
      </div>)}
    </div>
  )
}
