import CheckSvg from '@/components/svg/CheckSvg'
import styles from './index.module.scss'
import { colors } from '@/styles/variables'


interface Props {

}

export default function Sended(props: Props) {

  return (
    <div className={styles.root}>
      <CheckSvg className={styles.check} color={colors.blue500} />
      <div className={styles.title}>
        Подтвердите email
      </div>
      <div className={styles.text}>
        На указанный вами email выслано письмо с ссылкой подтверждением.<br />
        Перейдите по ссылке из письма, чтобы завершить регистрацию.<br />
        Если письма нет во входящих, проверьте папку Спам.
      </div>
    </div>
  )
}
