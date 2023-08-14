import { colors } from '@/styles/variables'
import EditSvg from '@/components/svg/EditSvg'
import Button from '@/components/ui/Button'
import styles from './index.module.scss'
import {IButton} from '@/types/types'
interface Props  extends IButton{
  fluid?: boolean
}

export default function EditButton(props: Props) {
  return (
    <Button spinner={props.spinner ?? false} disabled={props.disabled ?? false} className={styles.root} fluid={props.fluid} color={'grey'} styleType='large' onClick={props.onClick} icon={<EditSvg color={colors.blue500} />}>
      Редактировать
    </Button>
  )
}

