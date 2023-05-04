import { useState } from 'react'
import RegLayout from '../Common/RegLayout'
import BuyerRegForm from './Buyer/Form'
import Sended from './Buyer/Sended'
import { SwitchState } from '@/data/enum/SwitchState'

interface Props {
  stepKey?: string
}

export default function RegPage(props: Props) {

  const [sended, setSended] = useState<boolean>(false)

  const handleNext = () => {
    setSended(true)
  }

  const [regMode, setRegMode] = useState<SwitchState>(SwitchState.Secondoption)

  return (
    <>
      {!sended ?
        <RegLayout
          currentStepIndex={0}
          title={'Регистрация'}
          active={regMode}
          onClick={(active) => setRegMode(active)}
        >
          {regMode === SwitchState.Secondoption ?
            <BuyerRegForm onNextStep={handleNext} /> : null}
        </RegLayout>
        :
        <Sended />}
    </>
  )
}
