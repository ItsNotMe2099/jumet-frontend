import styles from './index.module.scss'
import { IOption } from 'types/types'
import ReactSelect from 'react-select'
import { DropdownIndicatorProps } from 'react-select/dist/declarations/src/components/indicators'
import { GroupBase } from 'react-select/dist/declarations/src/types'
import classNames from 'classnames'
import usePressAndHover from '@/components/hooks/usePressAndHover'


interface Props<T> {
  label?: string
  options: IOption<T>[]
  value: T
  onChange: (value: T | undefined) => void
  hasError?: boolean
  placeholder?: string
  className?: string
}

export default function Select<T>(props: Props<T>) {
  const selected = props.options.find(item => item.value == props.value)
  const [ref, press, hover] = usePressAndHover()

  return (
    <div className={classNames(styles.root, props.className)} ref={ref}>
      { props.label && (
        <div className={classNames({
          [styles.label]: true,
        })}>
          {props.label}
        </div>
      )}
      <ReactSelect<IOption<T>>
        defaultValue={selected}
        value={selected}
        isMulti={false}
        isClearable={true}
        menuPosition={'fixed'}
        className={classNames({
          [styles.input]: true,
          [styles.default]: true,
          [styles.error]: props.hasError,
          [styles.hover]: hover,
          [styles.press]: press,
        })}
        classNamePrefix="yg-select"
        isSearchable={false}
        placeholder={props.placeholder}
        onChange={(option) => {
          props.onChange((option as IOption<T>)?.value)
        }}
        options={props.options as any}
        components={{ DropdownIndicator }}
      />
    </div>
  )
}

const DropdownIndicator = (props: DropdownIndicatorProps<IOption<any>, false, GroupBase<IOption<any>>>) => {
  return (
    <img src="/images/icons/arrow_select.svg" alt="" className={classNames({
      [styles.indicator]: true,
      [styles.indicatorInverse]: props.selectProps.menuIsOpen,
    })}/>
  )
}
