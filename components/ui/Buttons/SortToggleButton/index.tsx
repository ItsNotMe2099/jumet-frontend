import {colors} from '@/styles/variables'
import {ButtonProps} from '@/components/ui/Button'
import styles from './index.module.scss'
import SortTopToBottomSvg from '@/components/svg/SortTopToBottomSvg'
import SortBottomToTopSvg from '@/components/svg/SortBottomToTopSvg'
import {SortOrder} from '@/types/enums'
import classNames from 'classnames'

interface Props extends ButtonProps{
  fluid?: boolean
  value: SortOrder
  onSelect: (value: SortOrder) => void
  labels: {[key in SortOrder]: string}
}

export default function SortToggleButton(props: Props) {
  const handleClick = () => {
    props.onSelect(props.value === SortOrder.Asc ? SortOrder.Desc : SortOrder.Asc)
  }
  return (
    <div className={classNames(styles.root, {[styles.fluid]: props.fluid})}  onClick={handleClick}>
      <div className={styles.text}>{props.labels[props.value]}</div>
      {props.value === 'DESC' && <SortTopToBottomSvg color={colors.dark500} />}
      {props.value === 'ASC' && <SortBottomToTopSvg color={colors.dark500} />}
    </div>
  )
}

