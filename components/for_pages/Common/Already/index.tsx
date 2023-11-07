import Button from '@/components/ui/Button'
import styles from './index.module.scss'
import classNames from 'classnames'


interface Props {
  topText: string
  btnText: string
  link: string
  btnClassName?: string
}

export default function Already(props: Props) {

  return (
    <div className={styles.already}>
      <div className={styles.top}>
        {props.topText}
      </div>
      <Button type={'button'} href={props.link} className={classNames(styles.signIn, props.btnClassName)} styleType='large' color='grey'>
        {props.btnText}
      </Button>
      <div className={styles.bottom}>
        При регистрации и входе вы соглашаетесь с политикой обработки персональных данных
      </div>
    </div>
  )
}
