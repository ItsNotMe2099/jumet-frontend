import React from 'react'
import {IField, IOption, Nullable} from '@/types/types'
import SelectField from '@/components/fields/SelectField'
import {ReceivingPointListWrapper, useReceivingPointListContext} from '@/context/receiving_point_list_state'
import {Props as SelectProps} from 'react-select/dist/declarations/src'

interface Props extends IField<number | null> {
  onChange: (value: number | null) => void
  selectProps?: Nullable<SelectProps>
  resettable?: boolean
}

const ReceivingPointFieldInner = (props: Props) => {
  const receivingPointListContext = useReceivingPointListContext()
  const options: IOption<number | null>[] = receivingPointListContext.items.map(i => ({label: i.name, value: i.id}))
  console.log('ReceivingPointList', options)
  return (
    <SelectField<number| null> {...props as any} options={options} onChange={props.onChange} selectProps={props.selectProps}/>
  )
}



export default function ReceivingPointField(props: Props) {
  return <ReceivingPointListWrapper>
    <ReceivingPointFieldInner {...props}/>
  </ReceivingPointListWrapper>
}
