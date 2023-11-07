import {InputFieldProps} from '@/components/fields/InputField'
import WeightField from '@/components/fields/WeightField'
export interface Props extends InputFieldProps<number>{

}
export default function WeightTonsField(props: Props) {
  return <WeightField min={0} max={10000000} format={'number'} {...props}
                      formatValue={((i) => (i ?? 0) / 1000)}
                      parseValue={(i) =>  (i ?? 0)  ?(i ?? 0) * 1000 : null}/>
}

