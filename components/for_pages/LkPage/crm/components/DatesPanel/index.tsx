import styles from './index.module.scss'
import HiddenXs from '@/components/visibility/HiddenXs'
import {IOption, Nullable} from '@/types/types'
import {IntervalType} from '@/data/interfaces/IntervalType'
import {FormikProvider, Form, useFormik} from 'formik'
import TabsField from '@/components/fields/TabsField'
import DateRangeField from '@/components/fields/DateRangeField'
interface IFormData{
  range: {from?: Nullable<string>, to?: Nullable<string>}
  interval: Nullable<IntervalType>
}
interface Props {
  className?: string
  interval: Nullable<IntervalType>,
  range: Nullable<{from?: Nullable<string>, to?: Nullable<string>}>
  onChange: (interval: Nullable<IntervalType>, range: Nullable<{from?: Nullable<string>, to?: Nullable<string>}>) => void
}

export default function DatesPanel(props: Props) {
  const intervals: IOption<IntervalType>[] = [
    { label: 'Сутки', value: 'day' },
    { label: 'Неделя', value: 'week' },
    { label: 'Месяц', value: 'month' },
    { label: 'Год', value: 'year' },
    { label: 'За всё время', value: 'all' },
  ]

  const formik = useFormik<IFormData>({
    initialValues: {range: props.range ?? {}, interval: 'day'},
    onSubmit: () => {

    }
  })
  const handleChangeRange = (range: Nullable<{from?: Nullable<string>, to?: Nullable<string>}>) => {
  formik.setFieldValue('interval', null)
    props.onChange(null, range)
    if(!range){
      formik.setFieldValue('interval', 'day')
      props.onChange('day', null)
    }
  }
  const handleChangeInterval = (interval: Nullable<IntervalType>) => {
    formik.setFieldValue('range', null)
    props.onChange(interval, null)
  }
  return (
    <FormikProvider value={formik}>
      <Form className={styles.root}>
        <HiddenXs>
          <div className={styles.tabsWrapper}>
            <TabsField<IntervalType> name={'interval'} options={intervals} onChange={handleChangeInterval} />
          </div>
        </HiddenXs>
        <DateRangeField name={'range'} onChange={handleChangeRange}/>
      </Form>
    </FormikProvider>

  )
}
