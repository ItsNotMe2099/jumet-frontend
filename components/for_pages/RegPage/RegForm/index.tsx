import Reg from './Reg'
import { useAppContext } from '@/context/state'
import { SwitchState } from '@/data/enum/SwitchState'
import Sended from './Sended'
import RegLayout from '../../Common/RegLayout'
import { useState } from 'react'

interface Props {
  stepKey?: string
}

export default function RegForm(props: Props) {

  const [sended, setSended] = useState<boolean>(false)

  const handleNext = () => {
    setSended(true)
  }

  const appContext = useAppContext()

  return (
    <>
      {!sended ?
        <RegLayout
        currentStepIndex={0}
          title={'Регистрация'}>
          {appContext.regMode === SwitchState.Secondoption ?
            <Reg onNextStep={handleNext} /> : null}
        </RegLayout>
        :
        <Sended />}
    </>
  )
}
