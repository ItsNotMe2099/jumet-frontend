import InputField from '@/components/fields/InputField'
import styles from 'components/for_pages/LkPage/ReceivingPointCreateForm/components/DeliveryZonesStep/index.module.scss'
import { FieldArray, Form, FormikProvider, useFormik } from 'formik'
import Validator from '@/utils/validator'
import { useState } from 'react'
import Button from '@/components/ui/Button'
import CirclePlusSvg from '@/components/svg/CirclePlusSvg'
import { colors } from '@/styles/variables'
import StepsControls from 'components/for_pages/LkPage/ReceivingPointCreateForm/components/StepsControls'
import YMapsField from '@/components/fields/YMapsField'


interface Props {
  onNextStep: (data?: any) => void
  onBack?: () => void
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
    props.onNextStep()
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
                          sign='км'
                          placeholder='От'
                          isNumbersOnly
                        />
                        <InputField
                          key={index}
                          name={`items[${index}].distanceTo`}
                          validate={Validator.required}
                          sign='км'
                          placeholder='До'
                          isNumbersOnly
                        />
                      </div>
                    </div>
                    <InputField
                      key={index}
                      label={'Стоимость доставки, ₽'}
                      sign='за тонну'
                      name={`items[${index}].price`}
                      validate={Validator.required}
                    />
                    <YMapsField name='coordinates' onMapClick={(e) => handleMapClick(e)} />
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
        <StepsControls onBack={props.onBack} />
      </Form>
    </FormikProvider>
  )
}
