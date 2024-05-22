import {useState} from 'react'
import styles from './index.module.scss'
import SuccessBlock from '../Common/SuccessBlock'
import SwitchFilter from '@/components/ui/SwitchFilter'
import BuyerRegForm from '@/components/for_pages/registration/BuyerRegForm'
import SellerRegForm from './SellerRegForm'
import CenterLayout from '@/components/for_pages/Common/CenterLayout'
import Heading from '@/components/ui/Heading'
import {useBonusTariffContext} from '@/context/bonus_tariff_state'
import BonusSellerAlert from '@/components/for_pages/Common/BonusSellerAlert'

enum RegType {
  Seller,
  Buyer
}

interface Props {
  stepKey?: string
}

export default function RegPage(props: Props) {
  const bonusTariffContext = useBonusTariffContext()
  const [sended, setSended] = useState<boolean>(false)

  const handleNext = () => {
    setSended(true)
  }

  const [type, setType] = useState<RegType>(RegType.Seller)
  if (sended) {
    return (
      <CenterLayout>
        <SuccessBlock
          title='Подтвердите email'
          text={<>На указанный вами email выслано письмо с ссылкой подтверждением.<br/>
            Перейдите по ссылке из письма, чтобы завершить регистрацию.<br/>
            Если письма нет во входящих, проверьте папку Спам. </>}
        />
      </CenterLayout>)
  }
  return (
    <CenterLayout>
      <div className={styles.wrapper}>
        <Heading>Регистрация</Heading>

        <SwitchFilter<RegType>
          active={type}
          onClick={(type) => setType(type)}
          items={[
            {label: 'Продавец лома', value: RegType.Seller},
            {label: 'Ломозаготовитель', value: RegType.Buyer},
          ]}
        />
        {type === RegType.Seller && <BonusSellerAlert/>}

        {type === RegType.Seller && <SellerRegForm/>}
        {type === RegType.Buyer && <BuyerRegForm onComplete={handleNext}/>}
      </div>
    </CenterLayout>
  )
}
