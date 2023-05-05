import styles from './index.module.scss'
import { useAuthContext } from 'context/auth_state'

interface Props { }

export default function OtpSnackbar(props: Props) {
  const authContext = useAuthContext()

  return (
    <div className={styles.root}>
      <span>{authContext.otpError?.text ? <>Код введен неверно. Попробуйте еще раз</> : null}</span>
    </div>
  )
}

