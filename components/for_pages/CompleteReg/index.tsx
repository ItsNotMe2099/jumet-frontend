import { useAppContext } from '@/context/state'
//import styles from './index.module.scss'
import FinishForm from './FinishForm'
import RegLayout from '../Common/RegLayout'


interface Props {

}

export default function CompleteReg(props: Props) {

  const appContext = useAppContext()

  return (
    <RegLayout
      currentStepIndex={0}
      title={'Завершите регистрацию'}
    >
      <FinishForm />
    </RegLayout>
  )
}
