import React from 'react'
import {IField, IOption, Nullable} from '@/types/types'
import SelectMultipleField from '@/components/fields/SelectMultipleField'
import {useField} from 'formik'
import {useReceivingPointListContext} from '@/context/receiving_point_list_state'


interface Props extends IField<number[]> {
  resettable?: boolean
  onChange?: (value: Nullable<number>) => void
}

export default function ReceivingPointMultiField(props: Props) {
  const [field] = useField<number[]>(props as any)
  const receivingPointListContext = useReceivingPointListContext()
  const options: IOption<number>[] = receivingPointListContext.items.map(i => ({label: i.name, value: i.id}))
  return (
    <SelectMultipleField<number>
      {...(props as any)}
      value={null}
      values={field.value?.map((i) => {
        const val = options.find(a => a.value === i)
        console.log('IterateVal11', val, i)
        if(!val){
          return null
        }
        return {
          label: val.label,
          value: val.value
        }
      }).filter(i => i != null)}
      options={options}
    />
  )
}

