import { colors } from '@/styles/variables'
import Button, {ButtonProps} from '@/components/ui/Button'
import styles from './index.module.scss'
import PlusSvg from '@/components/svg/PlusSvg'
interface Props extends ButtonProps{

}

export default function CreateButton(props: Props) {
  return (
    <Button type={props.type} className={styles.root} href={props.href ?? null} onClick={props.onClick ?? null} color={props.color ?? 'blue'} styleType={props.styleType ?? 'large'} icon={<PlusSvg color={colors.white} />}>
      {props.children ?? 'Добавить'}
    </Button>
  )
}

