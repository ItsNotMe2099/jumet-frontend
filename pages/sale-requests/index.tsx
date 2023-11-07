import Layout from '@/components/layout/Layout'
import styles from './index.module.scss'
import {useRef, useState} from 'react'
import classNames from 'classnames'
import HiddenXs from '@/components/visibility/HiddenXs'
import VisibleXs from '@/components/visibility/VisibleXs'
import { ListViewType } from '@/types/types'
import { useAppContext } from '@/context/state'
import Sticky from 'react-stickynode'
import {SaleRequestSearchWrapper, useSaleRequestSearchContext} from '@/context/sale_request_search_state'
import SortToggleButton from '@/components/ui/Buttons/SortToggleButton'
import ContentLoader from '@/components/ui/ContentLoader'
import InfiniteScroll from 'react-infinite-scroll-component'
import SaleRequestsFilter, {SaleRequestsFilterRef} from '@/components/for_pages/scrap-for-sale/Filter'
import {SortOrder} from '@/types/enums'
import EmptyStub from '@/components/ui/EmptyStub'
import Button from '@/components/ui/Button'
import {SaleRequestSearchCard} from '@/components/for_pages/Common/Cards/DealOfferOwnerCard'

interface Props {

}

const SaleRequestsPageWrapper = (props: Props) => {
  const appContext = useAppContext()
  const searchContext = useSaleRequestSearchContext()
  const [viewType, setViewType] = useState<ListViewType>(ListViewType.List)
  const filterRef = useRef<SaleRequestsFilterRef | null>(null)

  const sortToggle = ( <SortToggleButton fluid={appContext.isMobile} value={searchContext.sortOrder} onSelect={searchContext.setSortOrder} labels={{
    [SortOrder.Desc]: 'Вначале с большим весом', [SortOrder.Asc] : 'Вначале с меньшим весом'
  }}/>)
  const handleClearFilter = () => {
    filterRef.current?.clear()
  }
  return (
    <Layout>
      <div className={styles.root}>

        <div className={styles.top}>
          <div className={styles.title}>
            Лом на продажу
          </div>
          <HiddenXs>
            {sortToggle}
            </HiddenXs>
        </div>
        <div className={styles.container}>

          <div className={classNames(styles.left)}>
            <Sticky enabled={appContext.isDesktop} top={120} bottomBoundary={437}>
              <SaleRequestsFilter ref={filterRef} title={''} viewType={viewType} onSetViewType={setViewType} />
            </Sticky>
          </div>
          <div className={styles.right}>
            <VisibleXs>
              <div className={styles.top}>
                {sortToggle}
              </div>
            </VisibleXs>
            {!searchContext.isLoaded && <ContentLoader isOpen style={'block'}/>}
            {searchContext.isLoaded && searchContext.data.total === 0 &&
              <EmptyStub title={'Ничего не найдено'} text={'Мы не смогли найти заявки на продажу удолетворяющие условиям поиска. Попробуйте изменить условия'} actions={ <Button onClick={handleClearFilter} styleType='large' color='blue'>
                Очистить фильтр
              </Button>}/>}
            <InfiniteScroll
              dataLength={searchContext.data.data.length}
              next={searchContext.fetchMore}
              style={{overflow: 'inherit'}}
              loader={searchContext.data.total > 0 ?
                <ContentLoader style={'infiniteScroll'} isOpen={true}/> : null}
              hasMore={searchContext.data.total > searchContext.data.data.length}
              scrollThreshold={0.6}>
              <div className={styles.list}>
                {searchContext.data.data.map((i, index) => <SaleRequestSearchCard saleRequest={i} key={i.id} />)}
              </div>
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </Layout >
  )
}

export default function SaleRequestsPage() {
  return (<SaleRequestSearchWrapper>
    <SaleRequestsPageWrapper />
  </SaleRequestSearchWrapper>)
}
