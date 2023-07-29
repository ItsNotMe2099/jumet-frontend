import InputField, {InputFieldProps} from '@/components/fields/InputField'
export interface Props extends InputFieldProps<number>{

}
export default function DistanceField(props: Props) {
  return <InputField min={0} max={10000000} {...props}/>
}

