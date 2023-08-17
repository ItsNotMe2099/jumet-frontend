import React from 'react'
import {IField, IOption} from '@/types/types'
import SelectField, {SelectFieldProps} from '@/components/fields/SelectField'
import {ReceivingPointListWrapper, useReceivingPointListContext} from '@/context/receiving_point_list_state'

interface Props extends IField<number | null> {
  onChange: (value: number | null) => void
}

const ReceivingPointFieldInner = (props: Props) => {
  const receivingPointListContext = useReceivingPointListContext()
  const options: IOption<number | null>[] = receivingPointListContext.items.map(i => ({label: i.name, value: i.id}))

  return (
    <SelectField<number| null> {...props as SelectFieldProps<number, null>} options={options} onChange={props.onChange}/>
  )
}



export default function ReceivingPointField(props: Props) {
  return <ReceivingPointListWrapper>
    <ReceivingPointFieldInner {...props}/>
  </ReceivingPointListWrapper>
}
