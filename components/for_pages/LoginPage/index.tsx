import { useState } from 'react'
import RegLayout from '../Common/RegLayout'
import LoginForm from './Form'
import styles from './index.module.scss'
import { SwitchState } from '@/data/enum/SwitchState'

interface Props {

}


export default function LoginPage(props: Props) {

  const [regMode, setRegMode] = useState<SwitchState>(SwitchState.Secondoption)

  return (
    <div className={styles.root}>
      <RegLayout
        currentStepIndex={0}
        title='Вход на сайт'
        active={regMode}
        onClick={(active) => setRegMode(active)}
      >
        <LoginForm mode={regMode}/>
      </RegLayout>
    </div>
  )
}
