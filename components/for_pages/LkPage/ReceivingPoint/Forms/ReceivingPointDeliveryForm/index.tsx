import styles from 'components/for_pages/LkPage/ReceivingPoint/Forms/ReceivingPointDeliveryForm/index.module.scss'
import { FieldArray, Form, FormikProvider, useFormik } from 'formik'
import Validator from '@/utils/validator'
import Button from '@/components/ui/Button'
import CirclePlusSvg from '@/components/svg/CirclePlusSvg'
import { colors } from '@/styles/variables'
import {IDeliveryArea} from '@/data/interfaces/IDeliveryArea'
import PriceField from '@/components/fields/PriceField'
import DistanceField from '@/components/fields/DistanceField'
import {ReactElement} from 'react'
import {DeepPartial} from '@/types/types'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'


interface Props{
  receivingPoint?: IReceivingPoint | null
  footer: ReactElement
  onSubmit: (data: DeepPartial<IReceivingPoint>) => Promise<void>
}

interface IFormData {
  deliveryAreas: IDeliveryArea[]
}

export default function ReceivingPointDeliveryForm(props: Props) {

  const handleSubmit = async (data: IFormData) => {
    console.log('handleSubmit', props.onSubmit)
    await props.onSubmit(data)
  }


  const initialValues: IFormData = {
    deliveryAreas: props.receivingPoint?.deliveryAreas ?? [
      { name: null, deliveryPricePerTon: null, fromDistance: null, toDistance: null },
    ],
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })




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
        {props.footer}
      </Form>
    </FormikProvider>
  )
}
