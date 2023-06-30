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
import DropdownMenu from '@/components/ui/DropdownMenu'
import FilterSvg from '@/components/svg/FilterSvg'
import Button from '@/components/ui/Button'
import classNames from 'classnames'
import HiddenXs from '@/components/visibility/HiddenXs'
import VisibleXs from '@/components/visibility/VisibleXs'
import AddressField from '@/components/fields/AddressField'
import { Formik } from 'formik'
import { GeoObject, YandexResponseGeocoder } from 'data/interfaces/IYandexGeocoder'
import { YMapLocationRequest } from '@yandex/ymaps3-types'
import Converter from '@/utils/converter'
import SwitchFilter from '@/components/ui/SwitchFilter'
import ListSvg from '@/components/svg/ListSvg'
import MapSvg from '@/components/svg/MapSvg'
enum ViewType{
  List = 'list',
  Map = 'map'
}
export default function Index() {

  const data = {
    data: [
      {
        title: 'МеталлВторЧермет', price: '23000', address: 'г. Сергиев Посад, ул. Зои Космодемьянской, 32',
        isDelivery: true, haveLoading: true, opens: '9', closes: '23', rating: '4.8', id: 1, phone: '+ 7 (495) 256-34-34',
        inn: '7714886683', entity: 'ООО «Лебедев и Партнеры»', ogrn: '1127747034040', legalAddress: '123290, город Москва, тупик Магистральный 1-й, дом 5А, оф. D504, к.8',
        license: 'http://ncz.tj/system/files/Legislation/2_ru.pdf'
      },
      {
        title: 'МеталлВторЧермет', price: '23000', address: 'г. Сергиев Посад, ул. Зои Космодемьянской, 32',
        isDelivery: false, haveLoading: false, rating: '4.8', alwaysOpen: true, id: 2, phone: '+ 7 (495) 256-34-34',
        inn: '7714886683', entity: 'ООО «Лебедев и Партнеры»', ogrn: '1127747034040', legalAddress: '123290, город Москва, тупик Магистральный 1-й, дом 5А, оф. D504, к.8',
        license: 'http://ncz.tj/system/files/Legislation/2_ru.pdf'
      },
      {
        title: 'МеталлВторЧермет', price: '23000', address: 'г. Сергиев Посад, ул. Зои Космодемьянской, 32',
        isDelivery: true, haveLoading: false, opens: '9', closes: '13', rating: '4.8', id: 3, phone: '+ 7 (495) 256-34-34',
        inn: '7714886683', entity: 'ООО «Лебедев и Партнеры»', ogrn: '1127747034040', legalAddress: '123290, город Москва, тупик Магистральный 1-й, дом 5А, оф. D504, к.8',
        license: 'http://ncz.tj/system/files/Legislation/2_ru.pdf'
      },
      {
        title: 'МеталлВторЧермет', price: '23000', address: 'г. Сергиев Посад, ул. Зои Космодемьянской, 32',
        isDelivery: false, haveLoading: true, opens: '9', closes: '13', rating: '4.8', id: 4, phone: '+ 7 (495) 256-34-34',
        inn: '7714886683', entity: 'ООО «Лебедев и Партнеры»', ogrn: '1127747034040', legalAddress: '123290, город Москва, тупик Магистральный 1-й, дом 5А, оф. D504, к.8',
        license: 'http://ncz.tj/system/files/Legislation/2_ru.pdf'
      },
      {
        title: 'МеталлВторЧермет', price: '23000', address: 'г. Сергиев Посад, ул. Зои Космодемьянской, 32',
        isDelivery: true, haveLoading: true, opens: '9', closes: '13', rating: '4.8', id: 5, phone: '+ 7 (495) 256-34-34',
        inn: '7714886683', entity: 'ООО «Лебедев и Партнеры»', ogrn: '1127747034040', legalAddress: '123290, город Москва, тупик Магистральный 1-й, дом 5А, оф. D504, к.8',
        license: 'http://ncz.tj/system/files/Legislation/2_ru.pdf'
      },
      {
        title: 'МеталлВторЧермет', price: '23000', address: 'г. Сергиев Посад, ул. Зои Космодемьянской, 32',
        isDelivery: true, haveLoading: true, opens: '9', closes: '13', rating: '4.8', id: 6, phone: '+ 7 (495) 256-34-34',
        inn: '7714886683', entity: 'ООО «Лебедев и Партнеры»', ogrn: '1127747034040', legalAddress: '123290, город Москва, тупик Магистральный 1-й, дом 5А, оф. D504, к.8',
        license: 'http://ncz.tj/system/files/Legislation/2_ru.pdf'
      },
      {
        title: 'МеталлВторЧермет', price: '23000', address: 'г. Сергиев Посад, ул. Зои Космодемьянской, 32',
        isDelivery: true, haveLoading: true, opens: '9', closes: '13', rating: '4.8', id: 7, phone: '+ 7 (495) 256-34-34',
        inn: '7714886683', entity: 'ООО «Лебедев и Партнеры»', ogrn: '1127747034040', legalAddress: '123290, город Москва, тупик Магистральный 1-й, дом 5А, оф. D504, к.8',
        license: 'http://ncz.tj/system/files/Legislation/2_ru.pdf'
      },
      {
        title: 'МеталлВторЧермет', price: '23000', address: 'г. Сергиев Посад, ул. Зои Космодемьянской, 32',
        isDelivery: true, haveLoading: true, opens: '9', closes: '13', rating: '4.8', id: 8, phone: '+ 7 (495) 256-34-34',
        inn: '7714886683', entity: 'ООО «Лебедев и Партнеры»', ogrn: '1127747034040', legalAddress: '123290, город Москва, тупик Магистральный 1-й, дом 5А, оф. D504, к.8',
        license: 'http://ncz.tj/system/files/Legislation/2_ru.pdf'
      },
      {
        title: 'МеталлВторЧермет', price: '23000', address: 'г. Сергиев Посад, ул. Зои Космодемьянской, 32',
        isDelivery: true, haveLoading: true, opens: '9', closes: '13', rating: '4.8', id: 9, phone: '+ 7 (495) 256-34-34',
        inn: '7714886683', entity: 'ООО «Лебедев и Партнеры»', ogrn: '1127747034040', legalAddress: '123290, город Москва, тупик Магистральный 1-й, дом 5А, оф. D504, к.8',
        license: 'http://ncz.tj/system/files/Legislation/2_ru.pdf'
      },
      {
        title: 'МеталлВторЧермет', price: '23000', address: 'г. Сергиев Посад, ул. Зои Космодемьянской, 32',
        isDelivery: true, haveLoading: true, opens: '9', closes: '13', rating: '4.8', id: 10, phone: '+ 7 (495) 256-34-34',
        inn: '7714886683', entity: 'ООО «Лебедев и Партнеры»', ogrn: '1127747034040', legalAddress: '123290, город Москва, тупик Магистральный 1-й, дом 5А, оф. D504, к.8',
        license: 'http://ncz.tj/system/files/Legislation/2_ru.pdf'
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

  const [viewType, setViewType] = useState<ViewType>(ViewType.List)

  const [open, setOpen] = useState<boolean>(false)

  const [addressFormShown, setAddressFormShown] = useState(false)
  const [confirmShown, setConfirmShown] = useState(false)
  const [addressStr, setAddressStr] = useState<string | null>(null)
  const [location, setLocation] = useState<YMapLocationRequest | null>({ center: [55.76, 37.64], zoom: 10 })
  const [geoObject, setGeoObject] = useState<GeoObject>()

  const handleEditAddressClick = () => {
    setAddressFormShown(false)
  }
  const handleSetNewAddress = (geocoded: YandexResponseGeocoder) => {
    const geoObject = geocoded.response.GeoObjectCollection.featureMember[0].GeoObject
    const point = geoObject.Point
    const bounds = [
      geoObject.boundedBy.Envelope.lowerCorner.split(' ').map(i => parseFloat(i)),
      geoObject.boundedBy.Envelope.upperCorner.split(' ').map(i => parseFloat(i)),

    ]


    const center = point.pos.split(' ').map(i => parseFloat(i)) as [lon: number, lat: number, alt?: number]
    setLocation({ bounds: bounds as any, center })
    setGeoObject(geocoded.response.GeoObjectCollection.featureMember[0].GeoObject)
    setConfirmShown(true)
    setAddressStr(Converter.convertGeoObjectToString(geocoded.response.GeoObjectCollection.featureMember[0].GeoObject))
  }

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
            <FilterComponent title='Адрес расположения лома'
              element={() =>
                  <SwitchFilter<ViewType>
                      active={viewType}
                      onClick={setViewType}
                      className={styles.none}
                      items={[
                        {label: 'Списком', value: ViewType.List, icon: <ListSvg color={viewType === ViewType.List ? colors.blue500 : colors.dark500} />},
                        {label: 'На карте', value: ViewType.Map, icon: <MapSvg color={viewType === ViewType.Map ? colors.blue500 : colors.dark500} /> },
                      ]}
                  />}
            >
              <Formik initialValues={{}} onSubmit={() => { }}>
                <AddressField
                  hasAddress={!!geoObject}
                  name={'address'}
                  onNewAddress={handleSetNewAddress}
                  onEditClick={handleEditAddressClick}
                  placeholder='Город, улица, дом'
                />
              </Formik>
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
