import styles from 'components/for_pages/LkPage/ReceivingPointCreateForm/components/PricesStep/index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import TabsMultiField from '@/components/fields/TabsMultiField'
import {useDataContext} from '@/context/data_state'
import {useEffect, useMemo, useState} from 'react'
import {IScrapMetalCategory} from '@/data/interfaces/IScrapMetalCategory'
import PriceCategoryFormSection
  from '@/components/for_pages/LkPage/ReceivingPointCreateForm/components/PricesStep/PriceCategoryFormSection'

interface IFormData{

}
interface Props {
  onNextStep: (data?: any) => void
  onBack?: () => void
}

export default function PricesStep(props: Props) {
  const dataContext = useDataContext()
  const [categories, setCategories] = useState<IScrapMetalCategory[]>([])
  const handleSubmit = async (data) => {

    const categoryKeys = Object.keys(formik.values).map(i => i.replace('category_', '')).filter(i => !formik.values.scrapMetalCategories.includes(i)).forEach(category => {

    })
    props.onNextStep()
  }

  const initialValues = {
    scrapMetalCategories: [],
    prices: []
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })

  console.log('formik.values', formik.values)
  const mapCategories = useMemo<{[key: string]: IScrapMetalCategory}>(() => {
    const map: {[key: string]: IScrapMetalCategory} = {}
    dataContext.scrapMetalCategories.forEach(i => map[i.category] = i)
    return map
  }, [dataContext.scrapMetalCategories])
  useEffect(() => {
    formik.values.scrapMetalCategories.forEach(category => {
      if(!formik.values[`category_${category}`]) {
        formik.setFieldValue(`category_${category}`, {
          priceDependsOnWeight: false,
          priceDependsOnRubbish: false,
          category,
          price: null,
          pricesByWeight: []
        })
      }
      })
   const categoryKeys = Object.keys(formik.values).map(i => i.replace('category_', '')).filter(i => !formik.values.scrapMetalCategories.includes(i)).forEach(category => {

   })

    setCategories(formik.values.scrapMetalCategories)


  }, [formik.values.scrapMetalCategories])
  console.log(' formik.values',  formik.values)
  return (
    <FormikProvider value={formik}>

      <Form className={styles.root}>
        <TabsMultiField<string> options={dataContext.scrapMetalCategories.map(i => ({ label: i.name, value: i.category }))} name={'scrapMetalCategories'} label={'Категории лома, с которыми работаете'}/>
        {categories.map(category => (!!formik.values[`category_${category}`] && <PriceCategoryFormSection key={category} values={formik.values[`category_${category}`]} category={category} title={`Лом категории ${mapCategories[category]?.name}`}/>))}
      </Form>
    </FormikProvider>
  )
}
