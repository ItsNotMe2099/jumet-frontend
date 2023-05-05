import styles from './index.module.scss'
import { useField } from 'formik'
import { IField } from 'types/types'
import PinInput from 'react-pin-input'
import { useAuthContext } from 'context/auth_state'
import OtpSnackbar from './OtpSnackbar'
import classNames from 'classnames'

interface Props extends IField<string> {
  label?: string,
  length: number,
  onComplete: (code: string) => void
  errorMessage?: string
  snackbar?: boolean
}

export default function OtpCodeField(props: Props) {
  const { label, length, onComplete } = props
  const [field, meta, helpers] = useField(props as any)
  const { value } = field
  const showError = meta.touched && !!meta.error
  const authContext = useAuthContext()
  const handleComplete = (value: string) => {
    console.log('handleComplete', value)
    helpers.setValue(value)
    setTimeout(() => {
      props.onComplete(value)
    }, 100)

  }

  return (
    <div className={classNames(styles.root, { [styles.error]: props.snackbar })}>
      <PinInput
        focus
        disabled={props.disabled}
        length={length}
        initialValue=""
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
      {authContext.otpError?.show ? <OtpSnackbar /> : null}
    </div>
  )
}
