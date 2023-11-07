import {InputFieldProps, InputValueType} from '@/components/fields/InputField'
import {IOption} from '@/types/types'
import WeightField from '@/components/fields/WeightField'
import DropdownMenu from '@/components/ui/DropdownMenu'
import {useState} from 'react'
import styles from './index.module.scss'
import {useField} from 'formik'
import WeightUtils, {UnitWeight} from '@/utils/WeightUtils'

export interface Props extends InputFieldProps<number>{

}
export default function WeightWithUnitField(props: Props) {
  const [field, meta, helpers] = useField(props as any)
  const [unit, setUnit] = useState<UnitWeight>(WeightUtils.getUnitByValue(field.value))
  const options: IOption<UnitWeight>[] = [
    { value: UnitWeight.Kg, label: 'кг' },
    { value: UnitWeight.Ton, label: 'тонн' }
  ]
  const handleChangeUnits = (unit: UnitWeight) => {
    setUnit(unit)

    switch (unit){
      case UnitWeight.Kg:
        helpers.setValue(field.value)
        break
      case UnitWeight.Ton:
       helpers.setValue((field.value ?? 0) % 1000 > 0 ? ((field.value ?? 0) /1000) * 1000 : field.value)
    }



  }
  const dropDown = (<DropdownMenu<UnitWeight> valueWrapperClassName={styles.dropDownValueWrapper} options={options} value={unit} onSelect={handleChangeUnits}
                                              renderValue={(option, isActive) => <div className={styles.dropDownValue}>{option?.label}</div>}
                                    />)

  const formatValue = (value: InputValueType<number>) => {
    console.log('Value1100', value, Math.round(value! * 1000))
    if(value === null){
      return null
    }
    switch (unit){
      case UnitWeight.Kg:
        return value
      case UnitWeight.Ton:
        return Math.round(value! * 1000)
    }
  }

  const parseValue = (value: InputValueType<number>): InputValueType<number> => {
    if(value === null){
      return
    }
    switch (unit){
      case UnitWeight.Kg:
        return value
      case UnitWeight.Ton:
        return value! / 1000
    }
  }
    return (
  <WeightField resettable={props.resettable ?? false} name={props.name} label={props.label ?? ''} formatValue={formatValue} parseValue={parseValue} suffix={dropDown} format={unit === UnitWeight.Kg ? 'number' : 'decimal'} />)
}

