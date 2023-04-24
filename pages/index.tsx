import Layout from '@/components/layout/Layout'
import styles from './index.module.scss'
import Banner from '@/components/for_pages/MainPage/Banner'
import { ChangeEvent, useState } from 'react'
import SortTopToBottomSvg from '@/components/svg/SortTopToBottomSvg'
import SortBottomToTopSvg from '@/components/svg/SortBottomToTopSvg'
import { colors } from '@/styles/variables'
import PointCard from '@/components/for_pages/MainPage/PointCard'
import FilterComponent from '@/components/for_pages/MainPage/Filter'
import Switch from '@/components/ui/Switch'
import Tab from '@/components/ui/Tab'
import { formatInTimeZone } from 'date-fns-tz'
import ru from 'date-fns/locale/ru'
import Input from '@/components/ui/Input'
import FilterSwitch from '@/components/for_pages/MainPage/Filter/FilterSwitch'
import DropdownMenu from '@/components/ui/DropdownMenu'
import FilterSvg from '@/components/svg/FilterSvg'
import Button from '@/components/ui/Button'
import classNames from 'classnames'
import HiddenXs from '@/components/visibility/HiddenXs'
import VisibleXs from '@/components/visibility/VisibleXs'
import { SwitchState } from '@/data/enum/SwitchState'

export default function Index() {

  const data = {
    data: [
      {
        title: 'МеталлВторЧермет', price: '23000', address: 'г. Сергиев Посад, ул. Зои Космодемьянской, 32',
        isDelivery: true, haveLoading: true, opens: '9', closes: '23', rating: '4.8'
      },
      {
        title: 'МеталлВторЧермет', price: '23000', address: 'г. Сергиев Посад, ул. Зои Космодемьянской, 32',
        isDelivery: false, haveLoading: false, rating: '4.8', alwaysOpen: true
      },
      {
        title: 'МеталлВторЧермет', price: '23000', address: 'г. Сергиев Посад, ул. Зои Космодемьянской, 32',
        isDelivery: true, haveLoading: false, opens: '9', closes: '13', rating: '4.8'
      },
      {
        title: 'МеталлВторЧермет', price: '23000', address: 'г. Сергиев Посад, ул. Зои Космодемьянской, 32',
        isDelivery: false, haveLoading: true, opens: '9', closes: '13', rating: '4.8'
      },
      {
        title: 'МеталлВторЧермет', price: '23000', address: 'г. Сергиев Посад, ул. Зои Космодемьянской, 32',
        isDelivery: true, haveLoading: true, opens: '9', closes: '13', rating: '4.8'
      },
      {
        title: 'МеталлВторЧермет', price: '23000', address: 'г. Сергиев Посад, ул. Зои Космодемьянской, 32',
        isDelivery: true, haveLoading: true, opens: '9', closes: '13', rating: '4.8'
      },
      {
        title: 'МеталлВторЧермет', price: '23000', address: 'г. Сергиев Посад, ул. Зои Космодемьянской, 32',
        isDelivery: true, haveLoading: true, opens: '9', closes: '13', rating: '4.8'
      },
      {
        title: 'МеталлВторЧермет', price: '23000', address: 'г. Сергиев Посад, ул. Зои Космодемьянской, 32',
        isDelivery: true, haveLoading: true, opens: '9', closes: '13', rating: '4.8'
      },
      {
        title: 'МеталлВторЧермет', price: '23000', address: 'г. Сергиев Посад, ул. Зои Космодемьянской, 32',
        isDelivery: true, haveLoading: true, opens: '9', closes: '13', rating: '4.8'
      },
      {
        title: 'МеталлВторЧермет', price: '23000', address: 'г. Сергиев Посад, ул. Зои Космодемьянской, 32',
        isDelivery: true, haveLoading: true, opens: '9', closes: '13', rating: '4.8'
      },
    ],
    total: 100,
    page: 1
  }

  const date = new Date()
  const timeZone = 'Europe/Moscow'
  const hour = formatInTimeZone(date, timeZone, 'H', { locale: ru })

  const currentHour = Number(hour)

  const radiusTabs = [
    { radius: '5' },
    { radius: '10' },
    { radius: '20' },
    { radius: '50' },
  ]

  const categories = [
    { name: 'Category1' },
    { name: 'Category2' },
    { name: 'Category3' },
  ]

  const [filterPrice, setFilterPrice] = useState<string>('low')

  const [filterHaveDelivery, setfilterHaveDelivery] = useState<boolean>(false)
  const [filterHaveLoading, setFilterHaveLoading] = useState<boolean>(false)
  const [filterAlwaysopen, setFilterAlwaysOpen] = useState<boolean>(false)
  const [filterIsOpen, setFilterIsOpen] = useState<boolean>(false)

  const [filterRadius, setFilterRadius] = useState<string>('')

  const [filterListMap, setFilterListMap] = useState<SwitchState>(SwitchState.FirstOption)

  const [open, setOpen] = useState<boolean>(false)

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
          <FilterSwitch
            text1='Списком'
            text2='На карте'
            withIcon
            className={styles.listMap}
            onClick={(active) => setFilterListMap(active)}
            active={filterListMap} />
          <div className={classNames(styles.left, { [styles.none]: !open })}>
            <FilterComponent title='Адрес расположения лома'
              element={() => <FilterSwitch
                text1='Списком'
                text2='На карте'
                withIcon
                className={styles.none}
                onClick={(active) => setFilterListMap(active)}
                active={filterListMap} />}
            >
              <Input
                placeholder='Город, улица, дом'
              />
            </FilterComponent>
            <FilterComponent title='Радиус поиска пунктов приёма'>
              <>
                <div className={styles.tabs}>
                  {radiusTabs.map((i, index) =>
                    <Tab
                      className={styles.tab}
                      active={filterRadius === i.radius}
                      text={`${i.radius} км`}
                      key={index}
                      onClick={() => setFilterRadius(i.radius)} />
                  )}
                </div>
                <Input
                  placeholder='Свой радиус поиска'
                  label='км'
                  isNumbersOnly
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setFilterRadius(e.target.value)}
                  className={styles.km} />
              </>
            </FilterComponent>
            <FilterComponent title='Категория лома'>
              <DropdownMenu options={categories} />
            </FilterComponent>
            <FilterComponent title='Вес лома'>

            </FilterComponent>
            <FilterComponent title='Доставка и погрузка'>
              <div className={styles.switches}>
                <div className={styles.switch}>
                  <Switch checked={filterHaveDelivery} onChange={() => setfilterHaveDelivery(!filterHaveDelivery)} />
                  <div className={styles.label}>
                    Есть доставка
                  </div>
                </div>
                <div className={styles.switch}>
                  <Switch checked={filterHaveLoading} onChange={() => setFilterHaveLoading(!filterHaveLoading)} />
                  <div className={styles.label}>
                    Есть погрузка
                  </div>
                </div>
              </div>
            </FilterComponent>
            <FilterComponent title='Режим работы'>
              <div className={styles.tabs}>
                <Tab className={styles.tab2} text='Открыто сейчас' active={filterIsOpen} onClick={() => setFilterIsOpen(!filterIsOpen)} />
                <Tab className={styles.tab2} text='Круглосуточно' active={filterAlwaysopen} onClick={() => setFilterAlwaysOpen(!filterAlwaysopen)} />
              </div>
            </FilterComponent>
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
                {data.data.filter(i => filterHaveDelivery ? i.isDelivery :
                  filterHaveLoading ? i.haveLoading : filterAlwaysopen ? i.alwaysOpen :
                    filterIsOpen ?
                      (i.opens && currentHour >= +i.opens && i.closes && currentHour < +i.closes || i.alwaysOpen) : i).map((i, index) =>
                        <PointCard item={i} key={index} />
                      )}
              </div>
            </HiddenXs>
            <VisibleXs>
              <div className={styles.list}>
                {data.data.filter(i => filterHaveDelivery ? i.isDelivery :
                  filterHaveLoading ? i.haveLoading : filterAlwaysopen ? i.alwaysOpen :
                    filterIsOpen ?
                      (i.opens && currentHour >= +i.opens && i.closes && currentHour < +i.closes || i.alwaysOpen) : i).slice(0, 1).map((i, index) =>
                        <PointCard item={i} key={index} />
                      )}
                <Banner />
                {data.data.filter(i => filterHaveDelivery ? i.isDelivery :
                  filterHaveLoading ? i.haveLoading : filterAlwaysopen ? i.alwaysOpen :
                    filterIsOpen ?
                      (i.opens && currentHour >= +i.opens && i.closes && currentHour < +i.closes || i.alwaysOpen) : i).slice(1).map((i, index) =>
                        <PointCard item={i} key={index} />
                      )}
              </div>
            </VisibleXs>
          </div>
        </div>
      </div>
    </Layout>
  )
}
