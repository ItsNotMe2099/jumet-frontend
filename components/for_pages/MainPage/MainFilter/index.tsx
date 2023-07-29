import { useEffect, useRef, useState } from 'react'
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
import { IOption, ListViewType } from '@/types/types'
import { useDataContext } from '@/context/data_state'
import SwitchField from '@/components/fields/SwitchField'
import SelectField from '@/components/fields/SelectField'
import TabsField from '@/components/fields/TabsField'
import { IReceivingPointSearchRequest } from '@/data/interfaces/IReceivingPointSearchRequest'
import InputField from '@/components/fields/InputField'
import { useAppContext } from '@/context/state'
import { RemoveScroll } from 'react-remove-scroll'
import CloseModalBtn from '@/components/ui/CloseModalBtn'
import AddressField from '@/components/fields/AddressField'

interface IFormData extends IReceivingPointSearchRequest {
  radiusCustom?: number | null
}

interface Props {
  title: string
  viewType: ListViewType
  onSetViewType: (viewType: ListViewType) => void
}

export default function MainFilter(props: Props) {
  const searchContext = useReceivingPointSearchContext()
  const dataContext = useDataContext()
  const appContext = useAppContext()

  const [isOpenMobileFilter, setIsOpenMobileFilter] = useState(false)
  const initValuesRef = useRef<boolean>(false)
  const initialValues: IFormData = {
    location: null,
    radius: null,
    radiusCustom: null,
    scrapMetalCategory: null,
    weight: null,
    hasDelivery: false,
    hasLoading: false
  }
  const handleSubmit = () => {

  }
  const formik = useFormik<IFormData>({
    initialValues,
    onSubmit: handleSubmit
  })
  const handleToggleMobileFilter = () => {
    setIsOpenMobileFilter(!isOpenMobileFilter)
  }
  useEffect(() => {
    if (!initValuesRef.current) {
      initValuesRef.current = true
      return
    }
    searchContext.setFilter(formik.values)
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
  const radiusTabs: IOption<number>[] = [
    { label: '5 км', value: 5 },
    { label: '10 км', value: 10 },
    { label: '20 км', value: 20 },
    { label: '50км', value: 50 },
  ]

  return (

    <FormikProvider value={formik}>
      <Form className={styles.root}>
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
                  name={'address'}
                  placeholder='Город, улица, дом'
                />
              </FilterComponent>
              <FilterComponent title='Радиус поиска пунктов приёма'>
                <TabsField<number> options={radiusTabs} name={'radius'} />
                <InputField
                  placeholder='Свой радиус поиска'
                  label='км'
                  name={'radiusCustom'} />
              </FilterComponent>
              <FilterComponent title='Категория лома'>
                <SelectField<string> options={dataContext.scrapMetalCategories.map(i => ({ label: i.name, value: i.category }))}
                  name={'scrapMetalCategory'} />
              </FilterComponent>
              <FilterComponent title='Вес лома'>
                <InputField
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
                <TabsField<string> options={[{ label: 'Открыто сейчас', value: 'now' }, { label: 'Круглосуточно', value: '24' }]}
                  name={'openType'} />
              </FilterComponent>

            </div>
          </div>
        </RemoveScroll>
      </Form>
    </FormikProvider>
  )
}
