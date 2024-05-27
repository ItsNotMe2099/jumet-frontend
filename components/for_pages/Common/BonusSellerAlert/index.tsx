import {BonusType} from '@/data/enum/BonusType'
import Alert from '@/components/ui/Alert'
import {useBonusTariffContext} from '@/context/bonus_tariff_state'
import {useBonusSellerStateContext} from '@/context/bonus_seller_state_state'
import Formatter from '@/utils/formatter'
import {useEffect} from 'react'


interface Props {
}

export default function BonusSellerAlert(props: Props) {
  const bonusTariffContext = useBonusTariffContext()
  const bonusSellerState = useBonusSellerStateContext()
  useEffect(() => {
    bonusSellerState.reFetch()
  }, [])
  if(bonusTariffContext.isLoaded && (
    (!bonusSellerState.byTypes[BonusType.FirstDeal as BonusType] as any) && !bonusSellerState.isLoading)){
    return (
      <Alert  type={'attention'}  text={`Получите бонус ${Formatter.formatPrice(bonusTariffContext.byTypes[BonusType.FirstDeal as BonusType]?.amount)} за регистрацию и первую успешную сделку по продаже лома в сервисе Ломмаркет`}/>
    )
  }
  return null

}
