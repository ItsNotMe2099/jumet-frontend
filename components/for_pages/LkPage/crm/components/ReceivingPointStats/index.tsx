import DatesPanel from '@/components/for_pages/LkPage/crm/components/DatesPanel'
import styles from 'components/for_pages/LkPage/crm/components/ReceivingPointStats/index.module.scss'
import Donut from '@/components/for_pages/LkPage/crm/components/Donut'
import CardLayout from '@/components/for_pages/Common/CardLayout'
import Button from '@/components/ui/Button'
import ChevronRightSvg from '@/components/svg/ChevronRightSvg'
import {colors} from '@/styles/variables'
import VisibleXs from '@/components/visibility/VisibleXs'
import {ReportDashboardBuyerWrapper, useReportDashboardBuyerContext} from '@/context/report_dashbord_state'
import {Nullable} from '@/types/types'
import ContentLoader from '@/components/ui/ContentLoader'
import {IntervalType} from '@/data/interfaces/IntervalType'
import {ReportDealsBuyerWrapper, useReportDealsBuyerContext} from '@/context/report_deals_state'
import PricingTable from '@/components/for_pages/Common/PricingTable'
import WeightUtils from '@/utils/WeightUtils'
import Formatter from '@/utils/formatter'
import {useEffect} from 'react'

interface Props {
  receivingPointId: number
  loading?: boolean
}

const ReceivingPointStatsInner = (props: Props) => {
  const reportDashboardContext = useReportDashboardBuyerContext()
  const reportDealsContext = useReportDealsBuyerContext()
  const data = reportDashboardContext.data

  useEffect(() => {
    reportDashboardContext.reFetch()
    reportDealsContext.reFetch()
  }, [props.receivingPointId])
  const handleChangeDatesFilter = (interval: Nullable<IntervalType>, range: Nullable<{ from?: Nullable<string>, to?: Nullable<string> }>) => {
    if (interval) {
      reportDashboardContext.setFilter({interval})
      reportDealsContext.setFilter({interval})
    } else if (range) {
      reportDashboardContext.setFilter({
        from: range.from ?? null,
        to: range.to ?? null,
      })
      reportDealsContext.setFilter({
        from: range.from ?? null,
        to: range.to ?? null,
      })
    } else {
      reportDashboardContext.setFilter({})
      reportDealsContext.setFilter({})
    }
  }

  const loading = props.loading || !reportDashboardContext.isLoaded
  return (
    <div className={styles.root}>
     <DatesPanel interval={reportDashboardContext.filter.interval ?? null}
                  range={(reportDashboardContext.filter.from || reportDashboardContext.filter.to) ? {
                    from: reportDashboardContext.filter.from,
                    to: reportDashboardContext.filter.to
                  } : {}} onChange={handleChangeDatesFilter}/>
      {loading && <ContentLoader isOpen={true} style={'block'}/>}
      {!loading && data && <CardLayout>
        <Donut
          className={styles.donut}
          total={data.deals.total.deals_count}
          labelTotal={'Всего сделок'}
          totals={{
            label: 'Всего сделок',
            count: data.deals.total.deals_count,
            amount: data.deals.total.deals_sub_total,
            percent: 100
          }}
          values={[
            {
              label: 'Успешных сделок',
              count: data.deals.total.completed_deals_count,
              amount: data.deals.total.completed_deals_sub_total,
              color: colors.green400
            },
            {
              label: 'Сделок в работе',
              count: data.deals.total.active_deals_count,
              amount: data.deals.total.active_deals_sub_total,
              color: colors.yellow500
            },
            {
              label: 'Отмененных сделок',
              count: data.deals.total.terminated_deals_count,
              amount: data.deals.total.terminated_deals_sub_total,
              color: colors.red500
            },
          ]}
        />
        <VisibleXs><Button className={styles.mobile} reverse styleType='large' color='grey'
                           icon={<ChevronRightSvg color={colors.blue500}/>}>Детали</Button></VisibleXs>
      </CardLayout>}
      {reportDealsContext.data && !loading && <CardLayout>

        <PricingTable headerRow={{
          cells: [
            {value: <>Номер <br/>сделки</>},
            {value: <>Категория<br/> лома</>},
            {value: <>Вес лома,<br/> тонн</>},
            {value: <>Сумма<br/> сделки</>},
            {value: 'Доставка'},
            {value: 'Расстояние'},
          ]
        }} data={reportDealsContext.data.data.map((i) => ({
          cells: [{value: `${i.id}`},
            {value: ''},
            {value: WeightUtils.formatWeightWithoutSuffix(i.actualWeight)},
            {value: i.total ? Formatter.formatPrice(i.total) : '-'},
            {value: i.requiresDelivery ? 'Да' : 'Нет'},
            {value: i.requiresDelivery && typeof i.distance !== 'undefined' && i.distance! >= 0 ? `${Formatter.formatNumber(Math.ceil(i.distance!))} км` : '-'},
          ]
        }))}
        />
      </CardLayout>
      }
    </div>
  )
}

export default function ReceivingPointStats(props: Props) {
  return (  <ReportDashboardBuyerWrapper receivingPointId={props.receivingPointId}>
      <ReportDealsBuyerWrapper receivingPointId={props.receivingPointId}>
        <ReceivingPointStatsInner receivingPointId={props.receivingPointId} loading={props.loading}/>
      </ReportDealsBuyerWrapper>
    </ReportDashboardBuyerWrapper>)
}
