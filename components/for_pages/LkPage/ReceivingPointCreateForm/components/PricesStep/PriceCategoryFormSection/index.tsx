import styles from './index.module.scss'
import SwitchField from '@/components/fields/SwitchField'
import {FieldArray} from 'formik'
import Button from '@/components/ui/Button'
import CirclePlusSvg from '@/components/svg/CirclePlusSvg'
import {colors} from '@/styles/variables'
import Validator from '@/utils/validator'
import PercentField from '@/components/fields/PercentField'
import PriceField from '@/components/fields/PriceField'
import WeightField from '@/components/fields/WeightField'


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
      {isDependsOnRubbish && <PercentField name={`${prefix}rubbishInPercents`} label={''} suffix={'%'} validate={Validator.required}/>}
      {!isDependsOnWeight && <PriceField name={`${prefix}price`} label={'Цена'} suffix={'₽/т'} validate={Validator.required}/>}

      {isDependsOnWeight && <FieldArray name={`${prefix}pricesByWeight`}>
        {arrayHelpers => (
          <div className={styles.weightSection}>
              {props.values['pricesByWeight']?.map((item: any, index: number) => (<div className={styles.weightField}>
                  <div key={index} className={styles.row}>
                    <div className={styles.label}>Диапазон веса в тонах</div>
                    <WeightField name={`${prefix}pricesByWeight[${index}].minWeightInTons`} placeholder={'От'} suffix={'т'} validate={Validator.required}/>
                    <WeightField name={`${prefix}pricesByWeight[${index}].maxWeightInTons`} placeholder={'До'} suffix={'т'} validate={Validator.required}/>
                  </div>
                  <PriceField name={`${prefix}pricesByWeight[${index}].price`} suffix={'₽/т'} placeholder='Цена лома' validate={Validator.required}/>
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
