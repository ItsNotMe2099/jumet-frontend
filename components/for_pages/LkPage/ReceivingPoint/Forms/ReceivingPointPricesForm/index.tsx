import styles from 'components/for_pages/LkPage/ReceivingPoint/Forms/ReceivingPointPricesForm/index.module.scss'
import {Form, FormikProvider, useFormik} from 'formik'
import TabsMultiField from '@/components/fields/TabsMultiField'
import {useDataContext} from '@/context/data_state'
import {ReactElement, useEffect, useMemo} from 'react'
import {IScrapMetalCategory} from '@/data/interfaces/IScrapMetalCategory'
import PriceCategoryFormSection
  from 'components/for_pages/LkPage/ReceivingPoint/Forms/ReceivingPointPricesForm/PriceCategoryFormSection'
import {IPriceDescription} from '@/data/interfaces/IPriceDescription'
import {DeepPartial} from '@/types/types'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'
import FormErrorScroll from '@/components/ui/FormErrorScroll'

interface IFormData {
  scrapMetalCategories: string[]
}

interface Props {
  receivingPoint?: IReceivingPoint | null | undefined
  footer: ReactElement
  onSubmit: (data: DeepPartial<IReceivingPoint>) => Promise<void>
}

export default function ReceivingPointPricesForm(props: Props) {
  const dataContext = useDataContext()
  const handleSubmit = async (data: IFormData & any) => {
    Object.keys(formik.values).map(i => i.replace('category_', '')).filter(i => !formik.values.scrapMetalCategories.includes(i))
      .forEach(category => {
        delete data[`category_${category}`]
      })
    const prices: IPriceDescription[] = []
    data.scrapMetalCategories.forEach((i: string) => prices.push(data[`category_${i}`]))
    for (const price of prices) {
      if (!price.priceDependsOnRubbish) {
        delete price.rubbishInPercents
      }
      if (!price.priceDependsOnWeight) {
        delete price.pricesByWeight
      } else {
        delete price.price
      }
    }
    const newData = {
      scrapMetalCategories: data.scrapMetalCategories,
      prices
    }
    props.onSubmit(newData)
  }

  const pricesFormData = useMemo<any>(() => {
    const data: any = {}
    for (const price of props.receivingPoint?.prices ?? []) {
      data[`category_${price.category}`] = price
    }
    return data
  }, [props.receivingPoint?.prices])
  const initialValues: IFormData & any = {
    scrapMetalCategories: props.receivingPoint?.scrapMetalCategories ?? [],
  ...(pricesFormData ? pricesFormData : {}),
  }


  const formik = useFormik<IFormData & any>({
    initialValues,
    onSubmit: handleSubmit
  })


  const mapCategories = useMemo<{ [key: string]: IScrapMetalCategory }>(() => {
    const map: { [key: string]: IScrapMetalCategory } = {}
    dataContext.scrapMetalCategories.forEach(i => map[i.category] = i)
    return map
  }, [dataContext.scrapMetalCategories])
  useEffect(() => {
    formik.values.scrapMetalCategories.forEach((category: string) => {
      if (!formik.values[`category_${category}`]) {
        formik.setFieldValue(`category_${category}`, {
          priceDependsOnWeight: false,
          priceDependsOnRubbish: false,
          category,
          price: null,
          pricesByWeight: []
        })
      }
    })


  }, [formik.values.scrapMetalCategories])

  const sortedCategories = useMemo<string[]>(() => {
    const keys = dataContext.scrapMetalCategories.map(i => i.category as string)
    return formik.values.scrapMetalCategories.sort((a: string, b: string) => keys.indexOf(a) - keys.indexOf(b))
  }, [dataContext.scrapMetalCategories, formik.values.scrapMetalCategories])

  console.log('sortedCategories', sortedCategories)
  return (
    <FormikProvider value={formik}>

      <Form className={styles.root}>
        <FormErrorScroll formik={formik} />
        <TabsMultiField<string>
          options={dataContext.scrapMetalCategories.map((i) => ({label: i.name, value: i.category}))}
          name={'scrapMetalCategories'} label={'Категории лома, с которыми работаете'}/>
        {sortedCategories.map((category) => (!!formik.values[`category_${category}`] &&
          <PriceCategoryFormSection key={category} setFieldValue={formik.setFieldValue}
                                    values={formik.values[`category_${category}`]} category={category}
                                    title={`Лом категории ${mapCategories[category]?.name}`}/>))}
        {props.footer}
      </Form>
    </FormikProvider>
  )
}
