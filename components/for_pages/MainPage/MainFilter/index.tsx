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
import { useReceivingPointSearchContext } from '@/context/receiving_point_search_state'
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
import {useRouter} from 'next/router'

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
}
const ReceivingPointFilter = forwardRef<ReceivingPointFilterRef, Props>((props, ref) => {
  const searchContext = useReceivingPointSearchContext()
  const dataContext = useDataContext()
  const appContext = useAppContext()
  const router = useRouter()
  const [isOpenMobileFilter, setIsOpenMobileFilter] = useState(false)
  const initValuesRef = useRef<boolean>(false)
  const initFilterRef = useRef<boolean>(false)
  const initialValues: IFormData = {
    location: searchContext.filter?.location ?? null,
    address:  null,
    radius: searchContext.filter?.radius ?? null,
    scrapMetalCategory: searchContext.filter?.scrapMetalCategory ?? null,
    weight: searchContext.filter?.weight ?? null,
    hasDelivery: searchContext.filter?.hasDelivery ?? null,
    hasLoading: searchContext.filter?.hasLoading ?? null,
    workTimeType: searchContext.filter?.workTimeType ?? null
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
        router.replace('/', '/', {
          shallow: true
        })
      }, modified
    }),
  )
  const handleToggleMobileFilter = () => {
    setIsOpenMobileFilter(!isOpenMobileFilter)
  }
  const debouncedSetFilter = debounce((data: IFormData) => {
    if (!initFilterRef.current) {
      initFilterRef.current = true
      return
    }
    searchContext.setFilter(formik.values)
    const cleanObject = Object.fromEntries(Object.entries(formik.values).filter(([_, v]) => v != null && !!v))
    if(Object.keys(cleanObject).length === 0){
      router.replace('/', '/', {
        shallow: true
      })
    }else{
      router.replace('/', `/?filter=${encodeURI(JSON.stringify(Object.fromEntries(Object.entries(formik.values).filter(([_, v]) => v != null && !!v))))}`, {
        shallow: true
      })
    }

  }, 400)
  useEffect(() => {
    if (!initValuesRef.current) {
      initValuesRef.current = true
      return
    }
    debouncedSetFilter(formik.values)
  }, [formik.values])

  const viewTypeFilter = (<SwitchFilter<ListViewType>
    active={searchContext.viewType}
    onClick={searchContext.setViewType}
    className={styles.listMap}
    items={[
      {
        label: 'Списком',
        value: ListViewType.List,
        icon: <ListSvg color={searchContext.viewType === ListViewType.List ? colors.blue500 : colors.dark500} />
      },
      {
        label: 'На карте',
        value: ListViewType.Map,
        icon: <MapSvg color={searchContext.viewType === ListViewType.Map ? colors.blue500 : colors.dark500} />
      },
    ]}
  />)
  const handleChangeAddress = (address: IAddress | string | null) => {
    if( typeof address !== 'string' && address?.location) {
      formik.setFieldValue('location', address.location)
    }else if(!address){
      formik.setFieldValue('location', null)
    }
  }
  const handleChangeLocation = (location: ILocation | null) => {
    if(location) {
      formik.setFieldValue('address', null)
    }
  }

  return (

    <FormikProvider value={formik}>
      <Form className={classNames(styles.root, {[styles.map]: searchContext.viewType === ListViewType.Map})}>
        <FormErrorScroll formik={formik} />
        <Button onClick={handleToggleMobileFilter} fluid className={styles.mobileOpenToggle} color='blue' styleType='small'>
          <FilterSvg color={colors.white} />
          <span>{isOpenMobileFilter ? <>Скрыть фильтр</> : <>Открыть фильтр</>}</span>
        </Button>
        {appContext.isMobile && viewTypeFilter}
        <RemoveScroll enabled={!!appContext.isMobile && isOpenMobileFilter}>
          <div className={classNames(styles.filters, { [styles.none]: !isOpenMobileFilter })}>
            {appContext.isMobile && <div className={styles.mobileHeader}><div className={styles.title}>Подбор пунктов приема</div><CloseModalBtn onClick={() => setIsOpenMobileFilter(false)} color={colors.grey500} /></div>}
            {appContext.isDesktop && viewTypeFilter}
            <div className={styles.filtersWrapper}>

              <FilterComponent title='Адрес расположения лома'  className={styles.filter}>
                <AddressField
                  onChange={handleChangeAddress}
                  resettable={true}
                  name={'address'}
                  placeholder='Город, улица, дом'
                />
                {(!!formik.values?.address || !!formik.values?.location) ?  <LocationSuggestionField label={'Координаты'} name={'location'} resettable onChange={handleChangeLocation}/> : <></>}
              </FilterComponent>
              <FilterComponent title='Радиус поиска пунктов приёма' className={styles.filter}>
                <RadiusField name={'radius'}/>
              </FilterComponent>
              <FilterComponent title='Категория лома' className={styles.filter}>
                <SelectField<string> menuPosition={'bottom'} options={dataContext.scrapMetalCategories.map(i => ({ label: i.name, value: i.category }))}
                  name={'scrapMetalCategory'} />
              </FilterComponent>
              <FilterComponent title='Вес лома' className={styles.filter}>
                <WeightWithUnitField
                  resettable={true}
                  placeholder='Вес'
                  name={'weight'} />
              </FilterComponent>
              <FilterComponent title='Доставка и погрузка' className={styles.filter}>
                <div className={styles.switches}>
                  <SwitchField name={'hasDelivery'} label={'Есть доставка'} />
                  <SwitchField name={'hasLoading'} label={'Есть погрузка'} />
                </div>
              </FilterComponent>
              <FilterComponent title='Режим работы' className={styles.filter}>
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
