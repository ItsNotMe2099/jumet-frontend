import InputField, {InputFieldProps} from '@/components/fields/InputField'
export interface Props extends InputFieldProps<number>{

}
export default function WeightField(props: Props) {
  return <InputField<number> format={'number'} min={0} max={10000000} {...props}/>
}

