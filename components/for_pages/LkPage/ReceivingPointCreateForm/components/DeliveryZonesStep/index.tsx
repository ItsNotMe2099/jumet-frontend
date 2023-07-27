import InputField from '@/components/fields/InputField'
import styles from 'components/for_pages/LkPage/ReceivingPointCreateForm/components/DeliveryZonesStep/index.module.scss'
import { FieldArray, Form, FormikProvider, useFormik } from 'formik'
import Validator from '@/utils/validator'
import { useState } from 'react'
import Button from '@/components/ui/Button'
import CirclePlusSvg from '@/components/svg/CirclePlusSvg'
import { colors } from '@/styles/variables'
import FormStepFooter from '@/components/ui/FormStepFooter'
import {IFormStepProps} from '@/types/types'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'


interface Props extends IFormStepProps<IReceivingPoint>{

}

interface IFormData {
  name: string
  price: string
  distanceFrom: string
  distanceTo: string
  coordinates: { lat: '', lng: '' }
}

export default function DeliveryZoneStep(props: Props) {

  const handleSubmit = async (/*data*/) => {

  }

  const [formData, setFormData] = useState<IFormData[]>([])

  const initialValues = {
    items: [
      { name: '', price: '', distanceFrom: '', distanceTo: '' },
    ],
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })

  const handleMapClick = (e: ymaps.Event) => {
    const lat = e.get('coords')[0]
    const lng = e.get('coords')[1]
    formik.setFieldValue('coordinates', { lat, lng })
  }

  console.log('formik.values', formik.values)

  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <FieldArray name='items'>
          {arrayHelpers => (
            <>
              <div className={styles.items}>
                {formik.values.items.map((item, index) => (
                  <div key={index} className={styles.item}>
                    <div className={styles.number}>
                      Зона доставки {index + 1}
                    </div>
                    <InputField
                      key={index}
                      label={'Название зоны доставки'}
                      name={`items[${index}].name`}
                      validate={Validator.required}
                    />
                    <div className={styles.distance}>
                      <div className={styles.label}>
                        Расстояние от пункта приёма
                      </div>
                      <div className={styles.from}>
                        <InputField
                          key={index}
                          name={`items[${index}].distanceFrom`}
                          validate={Validator.required}
                          suffix='км'
                          placeholder='От'
                          type={'number'}
                        />
                        <InputField
                          key={index}
                          name={`items[${index}].distanceTo`}
                          validate={Validator.required}
                          suffix='км'
                          placeholder='До'
                          type={'number'}
                        />
                      </div>
                    </div>
                    <InputField
                      key={index}
                      label={'Стоимость доставки, ₽'}
                      suffix='за тонну'
                      name={`items[${index}].price`}
                      validate={Validator.required}
                    />
                  </div>
                ))}
              </div>
              <Button onClick={() => arrayHelpers.push({ name: '', price: '', distance: '' })} type='button' className={styles.add} styleType='large' color='grey'>
                <CirclePlusSvg color={colors.blue500} />
                Добавить еще зону доставки
              </Button>
            </>
          )
          }
        </FieldArray>
        <FormStepFooter  onBack={props.onBack} spinner={props.loading}/>
      </Form>
    </FormikProvider>
  )
}
