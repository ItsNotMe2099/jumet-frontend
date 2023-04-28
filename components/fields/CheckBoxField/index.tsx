import { FieldConfig, useField, useFormikContext } from 'formik'
import styles from 'components/fields/CheckBoxField/index.module.scss'
import { IField } from '@/types/types'
// @ts-ignore
import ReactCheckBox from 'react-custom-checkbox'
import { colors } from '@/styles/variables'
import CheckBoxSvg from '@/components/svg/CheckBoxSvg'

interface Props extends IField<boolean> {
  label?: string
  checked?: boolean
  disabled?: boolean
  color?: string
}

const CheckBoxField = (props: Props) => {

  // @ts-ignore
  const [field, meta, helpers] = useField(props as FieldConfig)
  const { setFieldValue, setFieldTouched, validateField } = useFormikContext()
  const hasError = !!meta.error && meta.touched

  return (
    <ReactCheckBox
      checked={field.value}
      disabled={props.disabled}
      onChange={(val: boolean) => setFieldValue(props.name, val)}
      icon={<div className={styles.wrapper}><CheckBoxSvg className={styles.icon} color={colors.dark500} /></div>}
      borderColor={props.color}
      borderRadius={4}
      size={16}
      label={props.label}
      containerClassName={styles.root}
    />
  )
}
export default CheckBoxField
