import styles from 'components/for_pages/LkPage/ReceivingPoint/Forms/ReceivingPointDeliveryForm/index.module.scss'
import {FieldArray, Form, FormikProvider, useFormik} from 'formik'
import Validator from '@/utils/validator'
import Button from '@/components/ui/Button'
import CirclePlusSvg from '@/components/svg/CirclePlusSvg'
import {colors} from '@/styles/variables'
import {IDeliveryArea} from '@/data/interfaces/IDeliveryArea'
import PriceField from '@/components/fields/PriceField'
import DistanceField from '@/components/fields/DistanceField'
import {ReactElement} from 'react'
import {DeepPartial} from '@/types/types'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'
import SwitchField from '@/components/fields/SwitchField'
import TabsField from '@/components/fields/TabsField'
import {DeliveryPriceType} from '@/data/enum/DeliveryPriceType'
import DeleteButton from '@/components/ui/Buttons/DeleteButton'


interface Props {
  receivingPoint?: IReceivingPoint | null
  footer: ReactElement
  onSubmit: (data: DeepPartial<IReceivingPoint>) => Promise<void>
}

interface IFormData {
  hasDelivery: boolean
  hasLoading: boolean
  deliveryPriceType: DeliveryPriceType
  deliveryPriceFixed: number | null,
  loadingPrice: number | null,
  deliveryAreas: IDeliveryArea[]
}

export default function ReceivingPointDeliveryForm(props: Props) {
  const initialDeliveryArea = {name: null, deliveryPricePerTon: null, fromDistance: null, toDistance: null}
  const handleSubmit = async (data: IFormData) => {
    console.log('handleSubmit', props.onSubmit)
    await props.onSubmit({
      hasDelivery: data.hasDelivery,
      hasLoading: data.hasLoading,
      ...(data.hasDelivery ? {
      ...(data.deliveryPriceType === DeliveryPriceType.Fixed ? {deliveryPriceFixed: data.deliveryPriceFixed, deliveryAreas: []} : {deliveryAreas: data.deliveryAreas, deliveryPriceFixed: null})
      } : {}),
      ...(data.hasLoading ? {loadingPrice: data.loadingPrice} : {loadingPrice: null}),
    } as DeepPartial<IReceivingPoint>)
  }


  const initialValues: IFormData = {
    hasDelivery: true,
    hasLoading: true,
    deliveryPriceType: DeliveryPriceType.ByDistance,
    deliveryPriceFixed: null,
    loadingPrice: null,
    deliveryAreas: props.receivingPoint?.deliveryAreas ?? [
      {...initialDeliveryArea},
    ],
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })

  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <div className={styles.switches}>
          <SwitchField name='hasDelivery' label='Есть доставка'/>
          <SwitchField name='hasLoading' label='Есть погрузка'/>
        </div>
        {formik.values.hasLoading && <div className={styles.line}/>}

        {formik.values.hasLoading && <div className={styles.title}>Условия погрузки</div>}

        {formik.values.hasLoading &&
          <PriceField name={'loadingPrice'} label={'Стоимость погрузки'} suffix={'₽/т'} validate={Validator.required}/>}
        {formik.values.hasLoading && formik.values.hasDelivery && <div className={styles.line}/>}
        <TabsField<DeliveryPriceType>
          name={'deliveryPriceType'}
          styleType={'filter'}
          options={[
            {
              label: 'Цена доставки фиксированная',
              value: DeliveryPriceType.Fixed,
            },
            {
              label: 'Цена зависит от расстояния',
              value: DeliveryPriceType.ByDistance,
            },
          ]}
        />
        {formik.values.hasDelivery && <div className={styles.title}>Условия доставки</div>}
        {formik.values.hasDelivery && formik.values.deliveryPriceType === DeliveryPriceType.Fixed &&
          <PriceField name={'deliveryPriceFixed'} label={'Стоимость доставки'} suffix={'₽/т'}
                      validate={Validator.required}/>}
        {formik.values.hasDelivery && formik.values.deliveryPriceType === DeliveryPriceType.ByDistance &&
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
                      {index > 0 && <div><DeleteButton onClick={() => arrayHelpers.remove(index)}/></div>}
                    </div>
                  ))}
                </div>
                <Button onClick={() => arrayHelpers.push({
                  ...initialDeliveryArea
                })} icon={ <CirclePlusSvg color={colors.blue500}/>} type='button' className={styles.add} styleType='large' color='grey'>
                  Добавить еще зону доставки
                </Button>
              </>
            )
            }
          </FieldArray>}
        {props.footer}
      </Form>
    </FormikProvider>
  )
}
