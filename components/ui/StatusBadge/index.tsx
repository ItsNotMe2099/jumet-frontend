import StatusBadgeRaw from '@/components/ui/StatusBadgeRaw'
export  type StatusBadgeColor = 'blue' | 'red' | 'green' | 'yellow'
interface IData{
  label: string,
  color: StatusBadgeColor
}
interface Props<T extends string> {
  data: {[key in T]: IData}
  value: T
}

export default function StatusBadge<T extends string>(props: Props<T>) {
  return (<StatusBadgeRaw label={props.data[props.value]?.label ?? ''} color={props.data[props.value]?.color ?? 'blue'}/>)
}
