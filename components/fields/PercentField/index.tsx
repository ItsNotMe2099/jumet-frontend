import InputField, {InputFieldProps} from '@/components/fields/InputField'
export interface Props extends InputFieldProps<number>{

}
export default function PercentField(props: Props) {
  return <InputField min={0} max={100} format={'number'} {...props}/>
}

