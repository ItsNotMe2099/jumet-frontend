import {ChangeEvent, useState} from 'react'
import styles from './index.module.scss'
import Button from '@/components/ui/Button'
import FilterSvg from '@/components/svg/FilterSvg'
import {colors} from '@/styles/variables'
import SwitchFilter from '@/components/ui/SwitchFilter'
import ListSvg from '@/components/svg/ListSvg'
import MapSvg from '@/components/svg/MapSvg'
import classNames from 'classnames'
import FilterComponent from '@/components/for_pages/MainPage/MainFilterSectionLayout'
import {Form, Formik, FormikProvider, useFormik} from 'formik'
import Input from '@/components/ui/Input'
import {useReceivingPointSearchContext, ViewType} from '@/context/receiving_point_search_state'
import {IOption} from '@/types/types'
import {useDataContext} from '@/context/data_state'
import AddressYandexField from '@/components/fields/AddressYandexField'
import SwitchField from '@/components/fields/SwitchField'
import SelectField from '@/components/fields/SelectField'
import TabsField from '@/components/fields/TabsField'
import {IReceivingPointSearchRequest} from '@/data/interfaces/IReceivingPointSearchRequest'


interface Props {

}

export default function MainFilter(props: Props) {
  const searchContext = useReceivingPointSearchContext()
  const dataContext = useDataContext()
  const [isOpenMobileFilter, setIsOpenMobileFilter] = useState(false)
  const [open, setOpen] = useState<boolean>(false)

  const initialValues: IReceivingPointSearchRequest = {
    location: null,
    radius: null,
    scrapMetalCategory: null,
    weight: null,
    hasDelivery: false,
    hasLoading: false
  }
  const handleSubmit = () => {

  }
  const formik = useFormik<IReceivingPointSearchRequest>({
    initialValues,
    onSubmit: handleSubmit
  })
  const handleToggleMobileFilter = () => {
    setIsOpenMobileFilter(isOpenMobileFilter)
  }
  const viewTypeFilter = (<SwitchFilter<ViewType>
    active={searchContext.viewType}
    onClick={searchContext.setViewType}
    className={styles.listMap}
    items={[
      {
        label: 'Списком',
        value: ViewType.List,
        icon: <ListSvg color={searchContext.viewType === ViewType.List ? colors.blue500 : colors.dark500}/>
      },
      {
        label: 'На карте',
        value: ViewType.Map,
        icon: <MapSvg color={searchContext.viewType === ViewType.Map ? colors.blue500 : colors.dark500}/>
      },
    ]}
  />)
  const radiusTabs: IOption<number>[] = [
    {label: '5 км', value: 5},
    {label: '10 км', value: 10},
    {label: '20 км', value: 20},
    {label: '50км', value: 50},
  ]

  return (
    <FormikProvider value={formik}>
      <Form className={styles.root}>
      <Button onClick={handleToggleMobileFilter} className={styles.open} color='blue' styleType='small'>
        <FilterSvg color={colors.white}/>
        <span>{isOpenMobileFilter ? <>Скрыть фильтр</> : <>Открыть фильтр</>}</span>
      </Button>
      {viewTypeFilter}
      <div className={classNames(styles.left, {[styles.none]: !open})}>
        <FilterComponent title='Адрес расположения лома' element={viewTypeFilter}>
          <Formik initialValues={{}} onSubmit={() => {
          }}>
            <AddressYandexField
              hasAddress={!!searchContext.filter.location}
              name={'address'}
              placeholder='Город, улица, дом'
            />
          </Formik>
        </FilterComponent>
        <FilterComponent title='Радиус поиска пунктов приёма'>
          <>
            <TabsField<number> options={radiusTabs} name={'radius'}/>
            <Input
              placeholder='Свой радиус поиска'
              label='км'
              isNumbersOnly
              onChange={(e: ChangeEvent<HTMLInputElement>) => searchContext.setFilter({radius: parseInt(e.target.value, 10)})}
              className={styles.km}/>
          </>
        </FilterComponent>
        <FilterComponent title='Категория лома'>
          <SelectField options={dataContext.scrapMetalCategories.map(i => ({label: i.name, value: i.category}))}
                       name={'scrapMetalCategory'}/>
        </FilterComponent>
        <FilterComponent title='Вес лома'>

        </FilterComponent>
        <FilterComponent title='Доставка и погрузка'>
          <div className={styles.switches}>
            <SwitchField name={'hasDelivery'} label={'Есть доставка'}/>
            <SwitchField name={'hasLoading'} label={'Есть погрузка'}/>
          </div>
        </FilterComponent>
        <FilterComponent title='Режим работы'>
          <TabsField<string> options={[{label: 'Открыто сейчас', value: ''}, {label: 'Круглосуточно', value: ''}]}
                             name={'openType'}/>
        </FilterComponent>
      </div>

      </Form>
    </FormikProvider>
  )
}
