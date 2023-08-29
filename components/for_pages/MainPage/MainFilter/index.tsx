import {forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react'
import styles from './index.module.scss'
import Button from '@/components/ui/Button'
import FilterSvg from '@/components/svg/FilterSvg'
import { colors } from '@/styles/variables'
import SwitchFilter from '@/components/ui/SwitchFilter'
import ListSvg from '@/components/svg/ListSvg'
import MapSvg from '@/components/svg/MapSvg'
import classNames from 'classnames'
import FilterComponent from '@/components/for_pages/MainPage/MainFilterSectionLayout'
import { Form, FormikProvider, useFormik } from 'formik'
import { useReceivingPointSearchContext, ViewType } from '@/context/receiving_point_search_state'
import {ListViewType} from '@/types/types'
import { useDataContext } from '@/context/data_state'
import SwitchField from '@/components/fields/SwitchField'
import SelectField from '@/components/fields/SelectField'
import TabsField from '@/components/fields/TabsField'
import { IReceivingPointSearchRequest } from '@/data/interfaces/IReceivingPointSearchRequest'
import { useAppContext } from '@/context/state'
import { RemoveScroll } from 'react-remove-scroll'
import CloseModalBtn from '@/components/ui/CloseModalBtn'
import AddressField from '@/components/fields/AddressField'
import {debounce} from 'debounce'
import WeightWithUnitField from '@/components/fields/WeightWithUnitField'
import RadiusField from '@/components/fields/RadiusField'
import {IAddress} from '@/data/interfaces/IAddress'
import LocationSuggestionField from '@/components/fields/LocationSuggestionField'
import {ILocation} from '@/data/interfaces/ILocation'
import {WorkTimeType} from '@/data/interfaces/WorkTimeType'
import FormErrorScroll from '@/components/ui/FormErrorScroll'
import {ScrapMetalCategory} from '@/data/enum/ScrapMetalCategory'

export interface ReceivingPointFilterRef {
  clear(): void
}
interface IFormData extends IReceivingPointSearchRequest {
  radiusCustom?: number | null
  address?: string | null
  scrapMetalCategory?: ScrapMetalCategory | null;
}

interface Props {
  title: string
  viewType: ListViewType
  onSetViewType: (viewType: ListViewType) => void
}
const ReceivingPointFilter = forwardRef<ReceivingPointFilterRef, Props>((props, ref) => {
  const searchContext = useReceivingPointSearchContext()
  const dataContext = useDataContext()
  const appContext = useAppContext()

  const [isOpenMobileFilter, setIsOpenMobileFilter] = useState(false)
  const initValuesRef = useRef<boolean>(false)
  const initialValues: IFormData = {
    location: null,
    address: null,
    radius: null,
    radiusCustom: null,
    scrapMetalCategory: null,
    weight: null,
    hasDelivery: false,
    hasLoading: false,
    workTimeType: null
  }
  const handleSubmit = () => {

  }

  const formik = useFormik<IFormData>({
    initialValues,
    onSubmit: handleSubmit
  })
  const modified = formik.dirty
  useImperativeHandle(
    ref,
    () => ({
      clear() {
       formik.resetForm()
      }, modified
    }),
  )
  const handleToggleMobileFilter = () => {
    setIsOpenMobileFilter(!isOpenMobileFilter)
  }
  const debouncedSetFilter = debounce((data: IFormData) => {
    searchContext.setFilter(formik.values)
  }, 400)
  useEffect(() => {
    if (!initValuesRef.current) {
      initValuesRef.current = true
      return
    }
    debouncedSetFilter(formik.values)
  }, [formik.values])

  const viewTypeFilter = (<SwitchFilter<ViewType>
    active={searchContext.viewType}
    onClick={searchContext.setViewType}
    className={styles.listMap}
    items={[
      {
        label: 'Списком',
        value: ViewType.List,
        icon: <ListSvg color={searchContext.viewType === ViewType.List ? colors.blue500 : colors.dark500} />
      },
      {
        label: 'На карте',
        value: ViewType.Map,
        icon: <MapSvg color={searchContext.viewType === ViewType.Map ? colors.blue500 : colors.dark500} />
      },
    ]}
  />)
  const handleChangeAddress = (address: IAddress | string | null) => {
    if( typeof address !== 'string' && address?.location) {
      formik.setFieldValue('location', address.location)
    }
  }
  const handleChangeLocation = (location: ILocation | null) => {
    if(location) {
      formik.setFieldValue('address', null)
    }
  }

  console.log('filterFORM', formik.values)
  return (

    <FormikProvider value={formik}>
      <Form className={styles.root}>
        <FormErrorScroll formik={formik} />
        <Button onClick={handleToggleMobileFilter} fluid className={styles.mobileOpenToggle} color='blue' styleType='small'>
          <FilterSvg color={colors.white} />
          <span>{isOpenMobileFilter ? <>Скрыть фильтр</> : <>Открыть фильтр</>}</span>
        </Button>
        {appContext.isMobile && viewTypeFilter}
        <RemoveScroll enabled={!!appContext.isMobile && isOpenMobileFilter}>
          <div className={classNames(styles.filters, { [styles.none]: !isOpenMobileFilter })}>
            {appContext.isMobile && <div className={styles.mobileHeader}><div className={styles.title}>Подбор пунктов приема</div><CloseModalBtn onClick={() => setIsOpenMobileFilter(false)} color={colors.grey500} /></div>}
            <div className={styles.filtersWrapper}>

              <FilterComponent title='Адрес расположения лома' preHeader={!appContext.isMobile ? viewTypeFilter : null}>
                <AddressField
                  onChange={handleChangeAddress}
                  resettable={true}
                  name={'address'}
                  placeholder='Город, улица, дом'
                />
                {(!!formik.values?.address || !!formik.values?.location) ?  <LocationSuggestionField label={'Координаты'} name={'location'} resettable onChange={handleChangeLocation}/> : <></>}
              </FilterComponent>
              <FilterComponent title='Радиус поиска пунктов приёма'>
                <RadiusField name={'radius'}/>
              </FilterComponent>
              <FilterComponent title='Категория лома'>
                <SelectField<string> menuPosition={'bottom'} options={dataContext.scrapMetalCategories.map(i => ({ label: i.name, value: i.category }))}
                  name={'scrapMetalCategory'} />
              </FilterComponent>
              <FilterComponent title='Вес лома'>
                <WeightWithUnitField
                  resettable={true}
                  placeholder='Вес'
                  name={'weight'} />
              </FilterComponent>
              <FilterComponent title='Доставка и погрузка'>
                <div className={styles.switches}>
                  <SwitchField name={'hasDelivery'} label={'Есть доставка'} />
                  <SwitchField name={'hasLoading'} label={'Есть погрузка'} />
                </div>
              </FilterComponent>
              <FilterComponent title='Режим работы'>
                <TabsField<WorkTimeType> resettable={true} options={[{ label: 'Открыто сейчас', value: WorkTimeType.Now }, { label: 'Круглосуточно', value: WorkTimeType.DayAndNight }]}
                  name={'workTimeType'} />
              </FilterComponent>

            </div>
          </div>
        </RemoveScroll>
      </Form>
    </FormikProvider>
  )
})
export default ReceivingPointFilter
