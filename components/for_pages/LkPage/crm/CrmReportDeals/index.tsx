import DatesPanel from '@/components/for_pages/LkPage/crm/components/DatesPanel'
import styles from './index.module.scss'
import Donut from '@/components/for_pages/LkPage/crm/components/Donut'
import CardLayout from '@/components/for_pages/Common/CardLayout'
import Button from '@/components/ui/Button'
import ChevronRightSvg from '@/components/svg/ChevronRightSvg'
import {colors} from '@/styles/variables'
import HiddenXs from '@/components/visibility/HiddenXs'
import VisibleXs from '@/components/visibility/VisibleXs'
import {Nullable} from '@/types/types'
import ContentLoader from '@/components/ui/ContentLoader'
import {useEffectOnce} from '@/components/hooks/useEffectOnce'
import PricingTable from '@/components/for_pages/Common/PricingTable'
import {ReportDealsBuyerWrapper, useReportDealsBuyerContext} from '@/context/report_deals_state'
import Formatter from '@/utils/formatter'
import WeightUtils from '@/utils/WeightUtils'
import {IntervalType} from '@/data/interfaces/IntervalType'

interface Props {

}

const CrmReportDealsInner = (props: Props) => {
  const reportDealsContext = useReportDealsBuyerContext()
  const data = reportDealsContext.data

  useEffectOnce(() => {
    reportDealsContext.reFetch()
  })
  const handleChangeDatesFilter = (interval: Nullable<IntervalType>, range: Nullable<{from?: Nullable<string>, to?: Nullable<string>}>) => {
    if (interval) {
      reportDealsContext.setFilter({interval})
    } else if (range) {
      reportDealsContext.setFilter({
        from: range.from ?? null,
        to: range.to ?? null,
      })
    } else {
      reportDealsContext.setFilter({})
    }
  }

  return (
    <div className={styles.root}>
      <DatesPanel interval={reportDealsContext.filter.interval ?? null}
                  range={(reportDealsContext.filter.from || reportDealsContext.filter.to) ? {
                    from: reportDealsContext.filter.from,
                    to: reportDealsContext.filter.to
                  } : {}} onChange={handleChangeDatesFilter}/>
      {!reportDealsContext.isLoaded && <ContentLoader isOpen={true} style={'block'}/>}
      {data?.dashboard && reportDealsContext.isLoaded && <CardLayout title='Сделки'
                                                                     topClassName={styles.top}
                                                                     additionalEl=
                                                                       {<HiddenXs><Button reverse styleType='large'
                                                                                          color='grey'
                                                                                          icon={<ChevronRightSvg
                                                                                            color={colors.blue500}/>}>Детали</Button></HiddenXs>}>
        <Donut
          className={styles.donut}
          total={data.dashboard.deals_count}
          labelTotal={'Всего сделок'}
          totals={{
            label: 'Всего сделок',
            count: data.dashboard.deals_count,
            amount: data.dashboard.deals_sub_total,
            percent: 100
          }}
          values={[
            {
              label: 'Успешных сделок',
              count: data.dashboard.completed_deals_count,
              amount: data.dashboard.completed_deals_sub_total,
              color: colors.green400
            },
            {
              label: 'Сделок в работе',
              count: data.dashboard.active_deals_count,
              amount: data.dashboard.active_deals_sub_total,
              color: colors.yellow500
            },
            {
              label: 'Отмененных сделок',
              count: data.dashboard.terminated_deals_count,
              amount: data.dashboard.terminated_deals_sub_total,
              color: colors.red500
            },
          ]}
        />
        <VisibleXs><Button className={styles.mobile} reverse styleType='large' color='grey'
                           icon={<ChevronRightSvg color={colors.blue500}/>}>Детали</Button></VisibleXs>
      </CardLayout>}
      {data?.data && reportDealsContext.isLoaded && <CardLayout>

        <PricingTable headerRow={{
          cells: [
            { value: <>Номер <br />сделки</> },
            { value: 'Пункт приёма' },
            { value: <>Категория<br /> лома</> },
            { value: <>Вес лома,<br /> тонн</> },
            { value: <>Сумма<br /> сделки</> },
            { value: 'Доставка' },
            { value: 'Расстояние' },
          ]
        }} data={data.data.map((i) => ({
          cells: [{ value: `${i.id}` },
            { value: i.receivingPoint?.address.address },
            { value: '' },
            { value: WeightUtils.formatWeightWithoutSuffix(i.actualWeight) },
            { value: i.total ? Formatter.formatPrice(i.total) : '-' },
            { value: i.requiresDelivery ? 'Да' : 'Нет' },
            { value: i.requiresDelivery && typeof i.distance !== 'undefined' && i.distance! >= 0 ? `${Formatter.formatNumber(Math.ceil(i.distance!))} км` : '-' },
          ]
        }))}
        />
      </CardLayout>
      }
    </div>
  )
}

export default function CrmReportDeals(props: Props) {
  return <ReportDealsBuyerWrapper>
    <CrmReportDealsInner/>
  </ReportDealsBuyerWrapper>
}
