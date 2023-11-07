import Layout from '@/components/layout/Layout'
import styles from './index.module.scss'
import Banner from '@/components/for_pages/MainPage/Banner'
import {useRef} from 'react'
import classNames from 'classnames'
import VisibleXs from '@/components/visibility/VisibleXs'
import ReceivingPointSearchCard from '@/components/for_pages/MainPage/ReceivingPointSearchCard'
import MainFilter from '@/components/for_pages/MainPage/MainFilter'
import {ReceivingPointSearchWrapper, useReceivingPointSearchContext} from '@/context/receiving_point_search_state'
import {ListViewType} from '@/types/types'
import {useAppContext} from '@/context/state'
import Sticky from 'react-stickynode'
import Formatter from '@/utils/formatter'
import SortToggleButton from '@/components/ui/Buttons/SortToggleButton'
import ContentLoader from '@/components/ui/ContentLoader'
import InfiniteScroll from 'react-infinite-scroll-component'
import {SortOrder} from '@/types/enums'
import EmptyStub from '@/components/ui/EmptyStub'
import Button from '@/components/ui/Button'
import {SaleRequestsFilterRef} from '@/components/for_pages/scrap-for-sale/Filter'
import {useRouter} from 'next/router'
import ReceivingPointSearchMap from '@/components/for_pages/MainPage/ReceivingPointSearchMap'
import {RemoveScroll} from 'react-remove-scroll'

const IndexWrapper = () => {
  const appContext = useAppContext()
  const searchContext = useReceivingPointSearchContext()
   const filterRef = useRef<SaleRequestsFilterRef | null>(null)
  const handleClearFilter = () => {
    filterRef.current?.clear()
  }

  return (
    <Layout>
      <div className={classNames(styles.root, {[styles.withMap]: searchContext.viewType === ListViewType.Map})}>
        <div className={styles.title}>
          Пункты приёма лома
        </div>
        <div className={styles.container}>
          <div className={classNames(styles.left, {[styles.desktop]: appContext.isDesktop})}>
            <Sticky enabled={appContext.isDesktop && searchContext.viewType !== ListViewType.Map} top={120} bottomBoundary={437} innerClass={styles.stickyInner}>
              <MainFilter ref={filterRef} title={''} />
            </Sticky>
          </div>
          <div className={styles.right}>
            {appContext.isDesktop && <Banner />}
            <div className={styles.top}>
              {appContext.isDesktop && <div className={classNames(styles.total)}>
                {searchContext.data?.total ?? 0} {Formatter.pluralize(searchContext.data?.total ?? 0, 'пункт', 'пункта', 'пунктов')} приема
              </div>}
              <div className={styles.btns}>
                {filterRef.current?.modified && searchContext.data.total > 0 && <Button onClick={handleClearFilter} styleType='small' color='blue'>
                  Очистить фильтр
                </Button>}
                <SortToggleButton fluid={appContext.isMobile} value={searchContext.sortOrder} onSelect={searchContext.setSortOrder} labels={{
                  [SortOrder.Desc]: 'Вначале с большей ценой', [SortOrder.Asc]: 'Вначале с меньшей ценой'
                }} />
              </div>
            </div>
            {appContext.isMobile && (!searchContext.isLoaded || (searchContext.isLoaded && searchContext.data.total == 0)) && <Banner />}

            {!searchContext.isLoaded && <ContentLoader isOpen style={'block'} />}
            {searchContext.isLoaded && searchContext.data.total == 0 &&
              <EmptyStub title={'Ничего не найдено'} text={'Мы не смогли найти пункты приема удолетворяющие условиям поиска. Попробуйте изменить условия'} actions={filterRef.current?.modified ? <Button onClick={handleClearFilter} styleType='large' color='blue'>
                Очистить фильтр
              </Button> : <></>} />}
            <InfiniteScroll
              dataLength={searchContext.data.data.length}
              next={searchContext.fetchMore}
              style={{ overflow: 'inherit' }}
              loader={searchContext.data.total > 0 ?
                <ContentLoader style={'infiniteScroll'} isOpen={true} /> : null}
              hasMore={searchContext.data.total > searchContext.data.data.length}
              scrollThreshold={0.6}>
              <div className={styles.list}>
                {searchContext.data.data.map((i, index) => <><ReceivingPointSearchCard item={i} key={index} />{index === 0 && appContext.isMobile && <Banner/>}</>)}
                <VisibleXs>
                  <Banner />
                </VisibleXs>
              </div>
            </InfiniteScroll>


          </div>
        </div>
      </div>
      {searchContext.viewType === ListViewType.Map ?<RemoveScroll enabled={true} noIsolation={true}> <div className={styles.map}>
          <ReceivingPointSearchMap/>
      </div> </RemoveScroll>: <></>}
    </Layout>
  )
}
function parseJsonSave<T>(json: string): T | null {
  try {
    console.log('parseJson', json)
    return JSON.parse(json) as any  as T
  }catch (e) {
    return null
  }
}

export default function IndexPage() {
  const router = useRouter()
  return (<ReceivingPointSearchWrapper initialFilter={parseJsonSave(router.query.filter as string)}>
    <IndexWrapper />
  </ReceivingPointSearchWrapper>)
}
