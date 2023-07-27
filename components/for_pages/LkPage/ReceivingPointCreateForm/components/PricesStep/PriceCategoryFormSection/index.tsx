import styles from './index.module.scss'
import SwitchField from '@/components/fields/SwitchField'
import InputField from '@/components/fields/InputField'
import {FieldArray} from 'formik'
import Button from '@/components/ui/Button'
import CirclePlusSvg from '@/components/svg/CirclePlusSvg'
import {colors} from '@/styles/variables'
import Validator from '@/utils/validator'


interface Props {
  title: string
  category: string
  values: any
  setFieldValue: (name: string, value: any) => void
}

export default function PriceCategoryFormSection(props: Props) {
  const prefix = `category_${props.category}.`
  const isDependsOnWeight = props.values['priceDependsOnWeight']
  const isDependsOnRubbish = props.values['priceDependsOnRubbish']
  console.log('values', props.values)
  const handleChangePriceDependsOnWeight = (val: boolean) => {
    if(val && !props.values[`${prefix}pricesByWeight`]){
      props.setFieldValue(`${prefix}pricesByWeight`, [{minWeightInTons: null, maxWeightInTons: null, price: null}] )
    }

  }

  return (

    <div className={styles.root}>
      <div className={styles.title}>{props.title}</div>
      <SwitchField name={`${prefix}priceDependsOnWeight`} label={'Цены за тонну зависят от веса'} onChange={handleChangePriceDependsOnWeight}/>
      <SwitchField name={`${prefix}priceDependsOnRubbish`} label={'Цены за вычетом засора'}/>
      {isDependsOnRubbish && <InputField name={`${prefix}rubbishInPercents`} type={'number'} label={''} suffix={'%'} validate={Validator.required}/>}
      {!isDependsOnWeight && <InputField name={`${prefix}price`} label={'Цена'} type={'number'} suffix={'₽/т'} validate={Validator.required}/>}

      {isDependsOnWeight && <FieldArray name={`${prefix}pricesByWeight`}>
        {arrayHelpers => (
          <div className={styles.weightSection}>
              {props.values['pricesByWeight']?.map((item: any, index: number) => (<div className={styles.weightField}>
                  <div key={index} className={styles.row}>
                    <div className={styles.label}>Диапазон веса в тонах</div>
                    <InputField name={`${prefix}pricesByWeight[${index}].minWeightInTons`} type={'number'} placeholder={'От'} suffix={'т'} validate={Validator.required}/>
                    <InputField name={`${prefix}pricesByWeight[${index}].maxWeightInTons`} type={'number'} placeholder={'До'} suffix={'т'} validate={Validator.required}/>
                  </div>
                  <InputField type={'number'} name={`${prefix}pricesByWeight[${index}].price`} suffix={'₽/т'} placeholder='Цена лома' validate={Validator.required}/>
                </div>
              ))}
            <Button onClick={() => arrayHelpers.push({minWeightInTons: null, maxWeightInTons: null, price: null})}
                    type='button' className={styles.add} styleType='large' color='grey'>
              <CirclePlusSvg color={colors.blue500}/>
              Добавить еще диапазон веса
            </Button>
          </div>
        )
        }
      </FieldArray>}

    </div>
  )
}
