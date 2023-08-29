import InputField, {InputFieldProps} from '@/components/fields/InputField'
export interface Props extends InputFieldProps<number>{

}
export default function WeightField(props: Props) {
  return <InputField<number> format={props.format ?? 'number'} scale={3} min={0} max={10000000} {...props}/>
}

