import styles from './index.module.scss'
import {useDealContext} from '@/context/deal_state'
import Formatter from '@/utils/formatter'
import Spinner from '@/components/ui/Spinner'
import {Nullable} from '@/types/types'
import {useMemo} from 'react'
import DescField from '@/components/ui/DescField'
import PriceField from '@/components/fields/PriceField'
import Validator from '@/utils/validator'

interface Props {
  actualWeight: Nullable<number>,
  actualRubbishInPercents: Nullable<number>
  onSetManualPrice: (value: boolean) => void,
}

export default function DealCalculationResult(props: Props) {
  const dealContext = useDealContext()
  const deal = dealContext.deal
  const loading = dealContext.calculateLoading
  const isEmpty = !props.actualWeight || !props.actualRubbishInPercents
  const emptyText = useMemo<Nullable<string>>(() => {
    if (isEmpty) {
      return null
    }
    const strings = [...(!props.actualWeight ? ['Вес'] : []), ...(!props.actualRubbishInPercents ? ['Засор'] : [])]
    return `Укажите ${strings.join(' и ')} для того чтобы рассчитать стомость на основе вашего предложения`
  }, [props.actualWeight, props.actualRubbishInPercents])

  return (
    <div className={styles.root}>
      <div className={styles.title}><div>Стоимость</div> {loading && <Spinner size={16} thickness={250} />}</div>
      <div className={styles.calcToggle} onClick={() => props.onSetManualPrice(!dealContext.isCalculateManual)}>{!dealContext.isCalculateManual ? 'Установить цену вручную' : 'Авто рассчет цены'}</div>
      {dealContext.isCalculateManual && <>
        <PriceField name='price' label={'Цена лома'} suffix={'₽/т'} validate={Validator.required}/>
        {dealContext.deal?.requiresDelivery && <PriceField name='deliveryPrice' label={'Цена доставки'} suffix={'₽/т'} validate={Validator.required}/>}
        {dealContext.deal?.requiresLoading && <PriceField name='loadingPrice' label={'Цена погрузки'} suffix={'₽/т'} validate={Validator.required}/>}

      </>}
      {isEmpty && <div className={styles.empty}>{emptyText}</div> }
      {!isEmpty && dealContext.calculationData &&  <>
        {(!dealContext.isCalculateManual && (dealContext.calculationData?.price ?? 0) > 0) && <DescField label={'Цена за тонну'} value={Formatter.formatPrice(dealContext.calculationData?.price ?? 0)}/>}
        {(!dealContext.isCalculateManual && deal?.requiresDelivery  && (dealContext.calculationData?.totalDelivery ?? 0) > 0) && <DescField label={'Доставка'} value={`${Formatter.formatPrice(dealContext.calculationData?.totalDelivery ?? 0)} (${Formatter.formatDeliveryPrice(dealContext.calculationData?.deliveryPrice ?? 0)})`}/>}
        {(!dealContext.isCalculateManual && deal?.requiresLoading  && (dealContext.calculationData?.totalLoading ?? 0) > 0) && <DescField label={'Погрузка'} value={`${Formatter.formatPrice(dealContext.calculationData?.totalLoading ?? 0)} (${Formatter.formatDeliveryPrice(dealContext.calculationData?.loadingPrice ?? 0)})`}/>}

        {(deal?.requiresLoading || deal?.requiresDelivery) && <DescField label={'Сумма без доставки и погрузки'} value={Formatter.formatPrice(dealContext.calculationData?.subTotal ?? 0)}/>}
        {!!deal?.total && <DescField label={'К оплате'} value={Formatter.formatPrice(dealContext.calculationData?.total)}/>}
       </>}
    </div>
  )
}
