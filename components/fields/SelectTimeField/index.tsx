import {IField, IOption} from 'types/types'
import {useMemo} from 'react'
import SelectField from 'components/fields/SelectField'
import Formatter from 'utils/formatter'
import { InputStyleType } from '@/types/enums'

interface Props extends IField<string> {
  styleType: InputStyleType
  step?: number
  isEndDate?: boolean
}

export default function SelectTimeField(props: Props) {

  const options: IOption<string>[] = useMemo(() => {
    const data = []
    for (let hours = 0; hours < 24; ++hours) {
      for (let mins = 0; mins < 60; mins += 30) {
        const t = `${Formatter.pad('00', hours.toString())}:${Formatter.pad('00', mins.toString())}`
        data.push({label: t, value: t})
      }
    }
    if(props.isEndDate){
      data[0].value = '23:59'
    }
    return data
  }, [])

  return (
    <SelectField
      {...props}
      options={options}
    />
  )
}
