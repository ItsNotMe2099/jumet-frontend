import { useAppContext } from '@/context/state'
import styles from './index.module.scss'
import Button from '@/components/ui/Button'
import classNames from 'classnames'
import { Routes } from '@/types/routes'

interface Props {
  className?: string
}

export default function SuggestionCard(props: Props) {

  const appContext = useAppContext()

  return (
    <div className={classNames(styles.root, props.className)}>
      {!appContext.token ?
        <>
          <div className={styles.text}>
            Представьтесь, чтобы доставить сообщение
          </div>
          <div className={styles.btns}>
            <Button href={Routes.login()} className={styles.signIn} color='grey' styleType='large'>
              Войти
            </Button>
            <Button href={Routes.registration} className={styles.signUp} color='blue' styleType='large'>
              Зарегистрироваться
            </Button>
          </div>
        </>
        :
        <>
          <Button color='blue' styleType='large'>
            Предложить сделку
          </Button>
        </>
      }
    </div>
  )
}
