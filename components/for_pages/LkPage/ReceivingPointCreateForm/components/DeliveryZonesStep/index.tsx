import InputField from '@/components/fields/InputField'
import styles from 'components/for_pages/LkPage/ReceivingPointCreateForm/components/DeliveryZonesStep/index.module.scss'
import { FieldArray, Form, FormikProvider, useFormik } from 'formik'
import Validator from '@/utils/validator'
import Button from '@/components/ui/Button'
import CirclePlusSvg from '@/components/svg/CirclePlusSvg'
import { colors } from '@/styles/variables'
import FormStepFooter from '@/components/ui/FormStepFooter'
import {IFormStepProps} from '@/types/types'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'
import {IDeliveryArea} from '@/data/interfaces/IDeliveryArea'
import PriceField from '@/components/fields/PriceField'
import DistanceField from '@/components/fields/DistanceField'


interface Props extends IFormStepProps<IReceivingPoint>{

}

interface IFormData {
  deliveryAreas: IDeliveryArea[]
}

export default function DeliveryZoneStep(props: Props) {

  const handleSubmit = async (data: IFormData) => {
    await props.onSubmit(data)
  }


  const initialValues: IFormData = {
    deliveryAreas: [
      { name: null, deliveryPricePerTon: null, fromDistance: null, toDistance: null },
    ],
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })


  console.log('formik.values', formik.values)

  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <FieldArray name='deliveryAreas'>
          {arrayHelpers => (
            <>
              <div className={styles.items}>
                {formik.values.deliveryAreas.map((item, index) => (
                  <div key={index} className={styles.item}>
                    <div className={styles.number}>
                      Зона доставки {index + 1}
                    </div>
                    <InputField
                      key={index}
                      label={'Название зоны доставки'}
                      name={`deliveryAreas[${index}].name`}
                      validate={Validator.required}
                    />
                    <div className={styles.distance}>
                      <div className={styles.label}>
                        Расстояние от пункта приёма
                      </div>
                      <div className={styles.from}>
                        <DistanceField
                          key={index}
                          name={`deliveryAreas[${index}].fromDistance`}
                          validate={Validator.required}
                          suffix='км'
                          format={'number'}
                          placeholder='От'
                        />
                        <DistanceField
                          key={index}
                          name={`deliveryAreas[${index}].toDistance`}
                          validate={Validator.required}
                          format={'number'}
                          suffix='км'
                          placeholder='До'
                        />
                      </div>
                    </div>
                    <PriceField
                      key={index}
                      label={'Стоимость доставки, ₽'}
                      suffix='за тонну'
                      format={'price'}
                      name={`deliveryAreas[${index}].deliveryPricePerTon`}
                      validate={Validator.required}
                    />
                  </div>
                ))}
              </div>
              <Button onClick={() => arrayHelpers.push({ name: null, deliveryPricePerTon: null, fromDistance: null, toDistance: null })} type='button' className={styles.add} styleType='large' color='grey'>
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
