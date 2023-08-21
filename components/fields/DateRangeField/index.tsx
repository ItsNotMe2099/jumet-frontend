import styles from './index.module.scss'
import {IField, Nullable} from 'types/types'
import { useField } from 'formik'
import FieldError from '@/components/fields/FieldError'
import CalendarSvg from '@/components/svg/CalendarSvg'
import {colors} from '@/styles/variables'
import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import {format, setHours, setMinutes, setSeconds} from 'date-fns'
import ClearSvg from '@/components/svg/ClearSvg'
type ValuePiece = Date | null;

type Value = Nullable<[ValuePiece, ValuePiece]>;
interface Props extends IField<{from: Nullable<string>, to: Nullable<string>}> {
  maxDate?: Date
  minDate?: Date
  className?: string
  onChange?: (val: Nullable<{from: Nullable<string>, to: Nullable<string>}>) => void
}

export default function DateRangeField(props: Props) {
  const [field, meta, helpers] = useField(props as any)
  const showError = meta.touched && !!meta.error
  const formatValue = (date: Date, from: boolean) => {
    if(from){
      setHours(date, 0)
      setMinutes(date, 0)
      setSeconds(date, 0)
    }else{
      setHours(date, 23)
      setMinutes(date, 59)
      setSeconds(date, 59)
    }
    return date.toISOString()
  }
  const handleChange = (value: Value) => {
    const newValue = {from: (value?.length ?? 0) > 0 && value![0] ? formatValue(value![0]!, true) : null, to: (value?.length ?? 0) > 1 && value![1] ? formatValue(value![1]!, false) : null}
    helpers.setValue(newValue)
    props.onChange?.(newValue)
  }
  const formDateLabel = (date: string) => {
    return format(new Date(date), 'dd.MM.yyyy')
  }
  const renderLabel = () => {
    const values = [
      ...(field.value?.from ? [formDateLabel(field.value.from)] : []),
      ...(field.value?.to ? [formDateLabel(field.value.to)] : []),
    ]
    return values.join('-')
  }

  return (
    <div className={styles.root} data-field={props.name}>
      <div className={styles.wrapper}>
        {props.label && (
          <div className={styles.label}>
            {props.label}
          </div>
        )}
        <div>
        <DateRangePicker className={styles.input}
                         onChange={handleChange as any}
                         value={[field.value?.from ? new Date(field.value.from) : null, field.value?.to ? new Date(field.value.to) : null]}
                         format={'dd.MM.yyyy'}
                         clearIcon={<ClearSvg className={styles.clearIcon} color={colors.grey500}/>}
                         calendarIcon={ <CalendarSvg color={colors.dark400} />}
        />
        </div>
        <FieldError showError={showError}>{meta.error}</FieldError>
      </div>
    </div>
  )
}

