import { colors } from '@/styles/variables'
import Button, {ButtonProps} from '@/components/ui/Button'
import styles from './index.module.scss'
import TrashSvg from '@/components/svg/TrashSvg'
interface Props extends ButtonProps{

}

export default function DeleteButton(props: Props) {
  return (
    <Button type={'button'} spinner={props.spinner ?? false} disabled={props.disabled ?? false} className={styles.root} href={props.href ?? null} onClick={props.onClick ?? null} color={props.color ?? 'grey'} styleType={props.styleType ?? 'large'} icon={<TrashSvg color={colors.blue500} />}>
      {props.children ?? 'Удалить'}
    </Button>
  )
}

