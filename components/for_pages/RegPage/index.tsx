import { useState } from 'react'
import RegLayout from '../Common/RegLayout'
import BuyerRegForm from './Buyer/Form'
import { SwitchState } from '@/data/enum/SwitchState'
import Seller from './Seller'
import styles from './index.module.scss'
import SuccessBlock from '../Common/SuccessBlock'

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
    <div className={styles.root}>
      {!sended ?
        <RegLayout
          currentStepIndex={0}
          title={'Регистрация'}
          active={regMode}
          onClick={(active) => setRegMode(active)}
        >
          {regMode === SwitchState.Secondoption ?
            <BuyerRegForm onNextStep={handleNext} /> : <Seller />}
        </RegLayout>
        :
        <SuccessBlock
          title='Подтвердите email'
          text={<>На указанный вами email выслано письмо с ссылкой подтверждением.<br />
            Перейдите по ссылке из письма, чтобы завершить регистрацию.<br />
            Если письма нет во входящих, проверьте папку Спам. </>}
        />}
    </div>
  )
}
