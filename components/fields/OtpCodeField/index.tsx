import styles from './index.module.scss'
import { useField } from 'formik'
import { IField } from 'types/types'
import PinInput from 'react-pin-input'
import { useAuthContext } from 'context/auth_state'
import classNames from 'classnames'
import FieldError from '@/components/fields/FieldError'

interface Props extends IField<string> {
  label?: string,
  length: number,
  onComplete?: (code: string) => void
  errorMessage?: string
  showError?: boolean
}

export default function OtpCodeField(props: Props) {
  const { label, length, onComplete } = props
  const [field, meta, helpers] = useField(props as any)
  const { value } = field
  const showError = meta.touched && !!meta.error
  const authContext = useAuthContext()
  const handleComplete = (value: string) => {
    helpers.setValue(value)
    if (props.onComplete) {
      setTimeout(() => {
        if (props.onComplete) {
          props.onComplete(value)
        }
      }, 100)
    }

  }

  return (
    <div className={classNames(styles.root, { [styles.error]: showError || props.showError })}>
      <PinInput
        focus
        disabled={props.disabled ?? false}
        length={length}
        initialValue={value}
        onChange={(value, index) => helpers.setValue(value)}
        type="numeric"
        inputMode="number"
        onComplete={handleComplete}
        style={{}}
        inputStyle={{}}
        inputFocusStyle={{}}
        autoSelect={true}
        regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
      />
      <FieldError showError={showError}>{meta.error}</FieldError>
    </div>
  )
}
