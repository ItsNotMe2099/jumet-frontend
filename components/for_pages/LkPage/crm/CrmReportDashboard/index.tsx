import DatesPanel from '@/components/for_pages/LkPage/crm/components/DatesPanel'
import styles from './index.module.scss'
import Donut from '@/components/for_pages/LkPage/crm/components/Donut'
import CardLayout from '@/components/for_pages/Common/CardLayout'
import Button from '@/components/ui/Button'
import ChevronRightSvg from '@/components/svg/ChevronRightSvg'
import {colors} from '@/styles/variables'
import ProgressBar from '@ramonak/react-progress-bar'
import classNames from 'classnames'
import ColoredCircleSvg from '@/components/svg/ColoredCircleSvg'
import HiddenXs from '@/components/visibility/HiddenXs'
import VisibleXs from '@/components/visibility/VisibleXs'
import {ReportDashboardBuyerWrapper, useReportDashboardBuyerContext} from '@/context/report_dashbord_state'
import {Nullable} from '@/types/types'
import ContentLoader from '@/components/ui/ContentLoader'
import {useEffectOnce} from '@/components/hooks/useEffectOnce'
import {useMemo} from 'react'
import {IAddress} from '@/data/interfaces/IAddress'
import {IntervalType} from '@/data/interfaces/IntervalType'

interface Props {

}

const CrmReportDashboardInner = (props: Props) => {
  const reportDashboardContext = useReportDashboardBuyerContext()
  const data = reportDashboardContext.data
  const receivingPoints = useMemo<{
    receivingPointId: number,
    name: string
    address: IAddress
  }[]>(() => {
    if (!data) {
      return []
    }
    return [...new Map([...data!.deals.byPoint, ...data!.offers.byPoint, ...data?.requests.byPoint].map(item =>
      [item.receivingPointId, item])).values()].map(i => ({
      receivingPointId: i.receivingPointId,
      address: i.address,
      name: i.name
    }))
  }, [data])
  useEffectOnce(() => {
    reportDashboardContext.reFetch()
  })
  const handleChangeDatesFilter = (interval: Nullable<IntervalType>, range: Nullable<{from?: Nullable<string>, to?: Nullable<string>}>) => {
    if (interval) {
      reportDashboardContext.setFilter({interval})
    } else if (range) {
      reportDashboardContext.setFilter({
        from: range.from ?? null,
        to: range.to ?? null,
      })
    } else {
      reportDashboardContext.setFilter({})
    }
  }

  console.log('Total11', data?.deals.total)
  return (
    <div className={styles.root}>
      <DatesPanel interval={reportDashboardContext.filter.interval ?? null}
                  range={(reportDashboardContext.filter.from || reportDashboardContext.filter.to) ? {
                    from: reportDashboardContext.filter.from,
                    to: reportDashboardContext.filter.to
                  } : {}} onChange={handleChangeDatesFilter}/>
      {!reportDashboardContext.isLoaded && <ContentLoader isOpen={true} style={'block'}/>}
      {data?.deals && reportDashboardContext.isLoaded && <CardLayout title='Сделки'
                                                                     topClassName={styles.top}
                                                                     additionalEl=
                                                                       {<HiddenXs><Button reverse styleType='large'
                                                                                          color='grey'
                                                                                          icon={<ChevronRightSvg
                                                                                            color={colors.blue500}/>}>Детали</Button></HiddenXs>}>
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
      {data?.deals && reportDashboardContext.isLoaded && receivingPoints.map((i, index) => {
          const deals = data!.deals.byPoint.find((a) => i.receivingPointId === a.receivingPointId) ?? {
            deals_count: 0,
            completed_deals_count: 0,
            active_deals_count: 0,
            terminated_deals_count: 0,
            deals_sub_total: 0,
            completed_deals_sub_total: 0,
            active_deals_sub_total: 0,
            terminated_deals_sub_total: 0
          }
          const offers = data!.offers.byPoint.find((a) => i.receivingPointId === a.receivingPointId) ?? {
            offers_prev: 0,
            offers_count: 0
          }
          const requests = data!.requests.byPoint.find((a) => i.receivingPointId === a.receivingPointId) ?? {
            requests_prev: 0,
            requests_count: 0
          }


          return (<CardLayout title={i.address.address as string}
                              key={index}
                              topClassName={styles.top}
                              additionalEl=
                                {<HiddenXs><Button reverse styleType='large' color='grey'
                                                   icon={<ChevronRightSvg
                                                     color={colors.blue500}/>}>Детали</Button></HiddenXs>}>
            <Donut
              className={styles.donut}
              total={deals.deals_count}
              labelTotal={'Всего сделок'}
              totals={{
                label: 'Всего сделок',
                count: deals.deals_count,
                amount: deals.deals_sub_total,
                percent: 100
              }}
              values={[
                {
                  label: 'Успешных сделок',
                  count: deals.completed_deals_count,
                  amount: deals.completed_deals_sub_total,
                  color: colors.green400
                },
                {
                  label: 'Сделок в работе',
                  count: deals.active_deals_count,
                  amount: deals.active_deals_sub_total,
                  color: colors.yellow500
                },
                {
                  label: 'Отмененных сделок',
                  count: deals.terminated_deals_count,
                  amount: deals.terminated_deals_sub_total,
                  color: colors.red500
                },
              ]}
            />
            <div className={styles.first}>
              <div className={styles.label}>
                Отклики по заявкам
              </div>
              <div className={styles.line}>
                <ProgressBar
                  className={styles.progress}
                  completed={offers.offers_count >= offers.offers_prev ? 100 : Math.ceil(offers.offers_count / offers.offers_prev * 100)}
                  isLabelVisible={false}
                  bgColor={colors.blue500}
                  baseBgColor="transparent"
                  height="8px"
                  borderRadius="2px"/>
                <div className={styles.number}>
                  {offers.offers_count}
                </div>
              </div>
              <div className={styles.line}>
                <ProgressBar
                  className={styles.progress}
                  completed={offers.offers_prev >= offers.offers_count ? 100 : Math.ceil(offers.offers_prev / offers.offers_count * 100)}
                  isLabelVisible={false}
                  bgColor={colors.blue300}
                  baseBgColor="transparent"
                  height="8px"
                  borderRadius="2px"/>
                <div className={classNames(styles.number, {[styles.less]: true})}>
                  {offers.offers_prev}
                </div>
              </div>
            </div>
            <div className={styles.second}>
              <div className={styles.label}>
                Прямые предложения купить лом
              </div>
              <div className={styles.line}>
                <ProgressBar
                  className={styles.progress}
                  completed={offers.offers_count >= offers.offers_prev ? 100 : Math.ceil(offers.offers_count / offers.offers_prev * 100) }
                  isLabelVisible={false}
                  bgColor={colors.blue500}
                  baseBgColor="transparent"
                  height="8px"
                  borderRadius="2px"/>
                <div className={styles.number}>
                  {requests.requests_count}
                </div>
              </div>
              <div className={styles.line}>
                <ProgressBar
                  className={styles.progress}
                  completed={requests.requests_prev >= requests.requests_count ? 100 : Math.ceil(requests.requests_prev / requests.requests_count * 100)}
                  isLabelVisible={false}
                  bgColor={colors.blue300}
                  baseBgColor="transparent"
                  height="8px"
                  borderRadius="2px"/>
                <div className={classNames(styles.number, {[styles.less]: true})}>
                  {requests.requests_prev}
                </div>
              </div>
            </div>
            <div className={styles.legend}>
              <div className={styles.item}>
                <ColoredCircleSvg color={colors.blue500}/>
                <div className={styles.text}>За выбранный период</div>
              </div>
              <div className={styles.item}>
                <ColoredCircleSvg color={colors.blue300}/>
                <div className={styles.text}>За предыдущий период</div>
              </div>
            </div>
            <VisibleXs><Button className={styles.mobile} reverse styleType='large' color='grey'
                               icon={<ChevronRightSvg color={colors.blue500}/>}>Детали</Button></VisibleXs>
          </CardLayout>)
        }
      )
      }
    </div>
  )
}

export default function CrmReportDashboard(props: Props) {
  return <ReportDashboardBuyerWrapper>
    <CrmReportDashboardInner/>
  </ReportDashboardBuyerWrapper>
}
