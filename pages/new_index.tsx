import Layout from '@/components/layout/Layout'
import styles from './index.module.scss'
import Banner from '@/components/for_pages/MainPage/Banner'
import { useState } from 'react'
import SortTopToBottomSvg from '@/components/svg/SortTopToBottomSvg'
import SortBottomToTopSvg from '@/components/svg/SortBottomToTopSvg'
import { colors } from '@/styles/variables'
import { formatInTimeZone } from 'date-fns-tz'
import ru from 'date-fns/locale/ru'
import FilterSvg from '@/components/svg/FilterSvg'
import Button from '@/components/ui/Button'
import classNames from 'classnames'
import HiddenXs from '@/components/visibility/HiddenXs'
import VisibleXs from '@/components/visibility/VisibleXs'
import SwitchFilter from '@/components/ui/SwitchFilter'
import ListSvg from '@/components/svg/ListSvg'
import MapSvg from '@/components/svg/MapSvg'
import { points } from '@/data/temp/points'
import ReceivingPointSearchCard from '@/components/for_pages/MainPage/ReceivingPointSearchCard'
import MainFilter from '@/components/for_pages/MainPage/MainFilter'
import {ReceivingPointSearchWrapper, useReceivingPointSearchContext} from '@/context/receiving_point_search_state'
enum ViewType{
  List = 'list',
  Map = 'map'
}
const  IndexWrapper = () => {

  const data = points

  const date = new Date()
  const timeZone = 'Europe/Moscow'
  const hour = formatInTimeZone(date, timeZone, 'H', { locale: ru })

  const [filterPrice, setFilterPrice] = useState<string>('low')
  const [viewType, setViewType] = useState<ViewType>(ViewType.List)
  const [open, setOpen] = useState<boolean>(false)
  const searchContext = useReceivingPointSearchContext()

  return (
    <Layout>
      <div className={styles.root}>
        <div className={styles.title}>
          Пункты приёма лома
        </div>
        <div className={styles.container}>
          <Button onClick={() => setOpen(!open)} className={styles.open} color='blue' styleType='small'>
            <FilterSvg color={colors.white} />
            <span>{open ? <>Скрыть фильтр</> : <>Открыть фильтр</>}</span>
          </Button>
          <SwitchFilter<ViewType>
              active={viewType}
              onClick={setViewType}
              className={styles.listMap}
              items={[
                {label: 'Списком', value: ViewType.List, icon: <ListSvg color={viewType === ViewType.List ? colors.blue500 : colors.dark500} />},
                {label: 'На карте', value: ViewType.Map, icon: <MapSvg color={viewType === ViewType.Map ? colors.blue500 : colors.dark500} />},
              ]}
          />
          <div className={classNames(styles.left, { [styles.none]: !open })}>
           <MainFilter title={''}/>
          </div>
          <div className={styles.right}>
            <Banner className={styles.nonePhone} />
            <div className={styles.top}>
              <div className={classNames(styles.total, styles.nonePhone)}>
                {data.total} пункта приема
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
            <HiddenXs>
              <div className={styles.list}>
                {searchContext.data.data.map((i, index) => <ReceivingPointSearchCard item={i} key={index}/>)}
              </div>
            </HiddenXs>
            <VisibleXs>
              <div className={styles.list}>
                {searchContext.data.data.map((i, index) => <ReceivingPointSearchCard item={i} key={index}/>)}
                <Banner />
              </div>
            </VisibleXs>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default function IndexPage(){
  return (<ReceivingPointSearchWrapper>
    <IndexWrapper/>
  </ReceivingPointSearchWrapper>)
}
