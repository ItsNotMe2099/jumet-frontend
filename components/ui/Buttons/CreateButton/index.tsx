import { colors } from '@/styles/variables'
import Button from '@/components/ui/Button'
import styles from './index.module.scss'
import PlusSvg from '@/components/svg/PlusSvg'
interface Props {}

export default function CreateButton(props: Props) {
  return (
    <Button className={styles.root} color='blue' styleType='large' icon={<PlusSvg color={colors.white} />}>
      Добавить
    </Button>
  )
}

