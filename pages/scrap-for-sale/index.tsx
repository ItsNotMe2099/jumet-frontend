import Layout from '@/components/layout/Layout'
import styles from './index.module.scss'
import Banner from '@/components/for_pages/MainPage/Banner'
import { useState } from 'react'
import SortTopToBottomSvg from '@/components/svg/SortTopToBottomSvg'
import SortBottomToTopSvg from '@/components/svg/SortBottomToTopSvg'
import { colors } from '@/styles/variables'
import { formatInTimeZone } from 'date-fns-tz'
import ru from 'date-fns/locale/ru'
import classNames from 'classnames'
import HiddenXs from '@/components/visibility/HiddenXs'
import VisibleXs from '@/components/visibility/VisibleXs'
import { ListViewType } from '@/types/types'
import { useAppContext } from '@/context/state'
import Sticky from 'react-stickynode'
import Filter from '@/components/for_pages/scrap-for-sale/Filter'
import { SaleRequestSearchWrapper, useSaleRequestSearchContext } from '@/context/sale_request_search_state'
import SaleRequestCard from '@/components/for_pages/scrap-for-sale/SaleRequestCard'

interface Props {

}



const ScrapForSaleWrapper = (props: Props) => {

  const appContext = useAppContext()

  const date = new Date()
  const timeZone = 'Europe/Moscow'
  const hour = formatInTimeZone(date, timeZone, 'H', { locale: ru })

  const [filterPrice, setFilterPrice] = useState<string>('low')
  const [viewType, setViewType] = useState<ListViewType>(ListViewType.List)
  const searchContext = useSaleRequestSearchContext()

  return (
    <Layout>
      <div className={styles.root}>

        <div className={styles.top}>
          <div className={styles.title}>
            Лом на продажу
          </div>
          <div className={styles.filter} onClick={() => setFilterPrice(filterPrice === 'high' ? 'low' : 'high')}>
            {filterPrice === 'low' ?
              <>
                <div className={styles.text}>Вначале с большей ценой</div>
                <SortTopToBottomSvg color={colors.dark500} />
              </>
              :
              <>
                <div className={styles.text}>Вначале с меньшей ценой</div>
                <SortBottomToTopSvg color={colors.dark500} />
              </>}
          </div>
        </div>
        <div className={styles.container}>

          <div className={classNames(styles.left)}>
            <Sticky enabled={appContext.isDesktop} top={120} bottomBoundary={437}>
              <Filter title={''} viewType={viewType} onSetViewType={setViewType} />
            </Sticky>
          </div>
          <div className={styles.right}>

            <HiddenXs>
              <div className={styles.list}>
                {searchContext.data.data.map((i, index) => <SaleRequestCard item={i} key={index} />)}
              </div>
            </HiddenXs>
            <VisibleXs>
              <div className={styles.list}>
                {searchContext.data.data.map((i, index) => <SaleRequestCard item={i} key={index} />)}
                <Banner />
              </div>
            </VisibleXs>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default function ScrapForSale() {
  return (<SaleRequestSearchWrapper>
    <ScrapForSaleWrapper />
  </SaleRequestSearchWrapper>)
}
