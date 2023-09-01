import Layout from '@/components/layout/Layout'
import styles from './index.module.scss'
import Banner from '@/components/for_pages/MainPage/Banner'
import { useRef, useState } from 'react'
import classNames from 'classnames'
import VisibleXs from '@/components/visibility/VisibleXs'
import ReceivingPointSearchCard from '@/components/for_pages/MainPage/ReceivingPointSearchCard'
import MainFilter from '@/components/for_pages/MainPage/MainFilter'
import { ReceivingPointSearchWrapper, useReceivingPointSearchContext } from '@/context/receiving_point_search_state'
import { ListViewType } from '@/types/types'
import { useAppContext } from '@/context/state'
import Sticky from 'react-stickynode'
import Formatter from '@/utils/formatter'
import SortToggleButton from '@/components/ui/Buttons/SortToggleButton'
import ContentLoader from '@/components/ui/ContentLoader'
import InfiniteScroll from 'react-infinite-scroll-component'
import { SortOrder } from '@/types/enums'
import EmptyStub from '@/components/ui/EmptyStub'
import Button from '@/components/ui/Button'
import { SaleRequestsFilterRef } from '@/components/for_pages/scrap-for-sale/Filter'
import {useRouter} from 'next/router'

const IndexWrapper = () => {
  const appContext = useAppContext()
  const searchContext = useReceivingPointSearchContext()
  const [viewType, setViewType] = useState<ListViewType>(ListViewType.List)
  const filterRef = useRef<SaleRequestsFilterRef | null>(null)
  const handleClearFilter = () => {
    filterRef.current?.clear()
  }

  return (
    <Layout>
      <div className={styles.root}>
        <div className={styles.title}>
          Пункты приёма лома
        </div>
        <div className={styles.container}>

          <div className={classNames(styles.left)}>
            <Sticky enabled={appContext.isDesktop} top={120} bottomBoundary={437}>
              <MainFilter ref={filterRef} title={''} viewType={viewType} onSetViewType={setViewType} />
            </Sticky>
          </div>
          <div className={styles.right}>
            <Banner className={styles.nonePhone} />
            <div className={styles.top}>
              <div className={classNames(styles.total, styles.nonePhone)}>
                {searchContext.data?.total ?? 0} {Formatter.pluralize(searchContext.data?.total ?? 0, 'пункт', 'пункта', 'пунктов')} приема
              </div>
              <div className={styles.btns}>
                {filterRef.current?.modified && searchContext.data.total > 0 && <Button onClick={handleClearFilter} styleType='small' color='blue'>
                  Очистить фильтр
                </Button>}
                <SortToggleButton fluid={appContext.isMobile} value={searchContext.sortOrder} onSelect={searchContext.setSortOrder} labels={{
                  [SortOrder.Desc]: 'Вначале с большей ценой', [SortOrder.Asc]: 'Вначале с меньшей ценой'
                }} />
              </div>
            </div>
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
                {searchContext.data.data.map((i, index) => <ReceivingPointSearchCard item={i} key={index} />)}
                <VisibleXs>
                  <Banner />
                </VisibleXs>
              </div>
            </InfiniteScroll>


          </div>
        </div>
      </div>
    </Layout>
  )
}
function parseJsonSave<T>(json: string): T | null {
  try {
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
