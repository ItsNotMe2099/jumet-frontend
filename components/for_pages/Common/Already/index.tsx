import Button from '@/components/ui/Button'
import styles from './index.module.scss'


interface Props {
  topText: string
  btnText: string
  link: string
}

export default function Already(props: Props) {

  return (
    <div className={styles.already}>
      <div className={styles.top}>
        {props.topText}
      </div>
      <Button href={props.link} className={styles.signIn} styleType='large' color='grey'>
        {props.btnText}
      </Button>
      <div className={styles.bottom}>
        При регистрации и входе вы соглашаетесь с политикой обработки персональных данных
      </div>
    </div>
  )
}
