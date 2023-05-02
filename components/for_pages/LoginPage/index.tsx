import RegLayout from '../Common/RegLayout'
import LoginForm from './Form'
import styles from './index.module.scss'

interface Props {

}


export default function LoginPage(props: Props) {

  return (
    <div className={styles.root}>
      <RegLayout currentStepIndex={0} title='Вход на сайт'>
        <LoginForm />
      </RegLayout>
    </div>
  )
}
