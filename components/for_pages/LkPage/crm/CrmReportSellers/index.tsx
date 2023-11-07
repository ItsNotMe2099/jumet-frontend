import DatesPanel from '@/components/for_pages/LkPage/crm/components/DatesPanel'
import styles from './index.module.scss'
import CardLayout from '@/components/for_pages/Common/CardLayout'
import {Nullable} from '@/types/types'
import ContentLoader from '@/components/ui/ContentLoader'
import {useEffectOnce} from '@/components/hooks/useEffectOnce'
import PricingTable from '@/components/for_pages/Common/PricingTable'
import Formatter from '@/utils/formatter'
import WeightUtils from '@/utils/WeightUtils'
import {IntervalType} from '@/data/interfaces/IntervalType'
import {ReportSellersBuyerWrapper, useReportSellersBuyerContext} from '@/context/report_sellers_state'
import UserUtils from '@/utils/UserUtils'

interface Props {

}

const CrmReportSellersInner = (props: Props) => {
  const reportSellersContext = useReportSellersBuyerContext()
  const data = reportSellersContext.data

  useEffectOnce(() => {
    reportSellersContext.reFetch()
  })
  const handleChangeDatesFilter = (interval: Nullable<IntervalType>, range: Nullable<{ from?: Nullable<string>, to?: Nullable<string> }>) => {
    if (interval) {
      reportSellersContext.setFilter({interval})
    } else if (range) {
      reportSellersContext.setFilter({
        from: range.from ?? null,
        to: range.to ?? null,
      })
    } else {
      reportSellersContext.setFilter({})
    }
  }

  return (
    <div className={styles.root}>
      <DatesPanel interval={reportSellersContext.filter.interval ?? null}
                  range={(reportSellersContext.filter.from || reportSellersContext.filter.to) ? {
                    from: reportSellersContext.filter.from,
                    to: reportSellersContext.filter.to
                  } : {}} onChange={handleChangeDatesFilter}/>
      {!reportSellersContext.isLoaded && <ContentLoader isOpen={true} style={'block'}/>}

      {data?.data && reportSellersContext.isLoaded && <CardLayout>

        <PricingTable headerRow={{
          cells: [
            {value: 'Телефон'},
            {value: 'ФИО клиента'},
            {value: 'Категория'},
            {value: 'Вес лома, тонн'},
            {value: 'Сумма сделки'},
          ]
        }}
                      data={data.data.map((i) => ({
                        cells: [{value: `${Formatter.formatPhone(i.phone)}`},
                          {value: UserUtils.getName(i)},
                          {value: i.scrapMetalCategory ?? '-'},
                          {value: i.weight ? WeightUtils.formatWeightInTons(i.weight) : '-'},
                          {value: i.subTotal ? Formatter.formatPrice(i.subTotal) : '-'},
                        ]
                      }))}
        />
      </CardLayout>
      }
    </div>
  )
}

export default function CrmReportSellers(props: Props) {
  return <ReportSellersBuyerWrapper>
    <CrmReportSellersInner/>
  </ReportSellersBuyerWrapper>
}
