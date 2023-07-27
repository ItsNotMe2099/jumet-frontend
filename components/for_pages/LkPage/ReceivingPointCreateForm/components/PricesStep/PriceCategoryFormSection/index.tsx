import styles from './index.module.scss'
import SwitchField from '@/components/fields/SwitchField'
import InputField from '@/components/fields/InputField'
import {FieldArray} from 'formik'
import Button from '@/components/ui/Button'
import CirclePlusSvg from '@/components/svg/CirclePlusSvg'
import {colors} from '@/styles/variables'


interface Props {
  title: string
  category: string
  values: any
}

export default function PriceCategoryFormSection(props: Props) {
  const prefix = `category_${props.category}.`
  const isDependsOnWeight = props.values['priceDependsOnWeight']
  const isDependsOnRubbish = props.values['priceDependsOnRubbish']
  console.log('values', props.values)
  return (

    <div className={styles.root}>
      <div className={styles.title}>{props.title}</div>
      <SwitchField name={`${prefix}priceDependsOnWeight`} label={'Цены за тонну зависят от веса'}/>
      <SwitchField name={`${prefix}priceDependsOnRubbish`} label={'Цены за вычетом засора'}/>
      {isDependsOnRubbish && <InputField name={`${prefix}rubbishInPercents`} label={''} suffix={'%'}/>}

      {isDependsOnWeight && <FieldArray name={`${prefix}pricesByWeight`}>
        {arrayHelpers => (
          <div className={styles.weightSection}>
              {props.values['pricesByWeight'].map((item, index) => (<div className={styles.weightField}>
                  <div key={index} className={styles.row}>
                    <div className={styles.label}>Диапазон веса в тонах</div>
                    <InputField name={`${prefix}pricesByWeight[${index}].minWeightInTons`} placeholder={'От'} suffix={'т'}/>
                    <InputField name={`${prefix}pricesByWeight[${index}].maxWeightInTons`} placeholder={'До'} suffix={'т'}/>
                  </div>
                  <InputField isNumbersOnly name={`${prefix}pricesByWeight[${index}].price`} suffix={'₽/т'} labe='Цена лома'/>
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
