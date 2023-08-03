import styles from './index.module.scss'
import { forwardRef } from 'react'
import Button from '@/components/ui/Button'
import ChatSvg from '@/components/svg/ChatSvg'
import { colors } from '@/styles/variables'

interface Props {
  onClick?: () => void
}

const ShowChatMobileToggle = forwardRef<HTMLDivElement, Props >((props, ref) => {
  return (
    <div className={styles.root} ref={ref}>
      <Button onClick={props.onClick} className={styles.btn} color='blue' font={'normal15'} styleType='small' icon={<ChatSvg color={colors.white} />}>
        Чат с пунктом приёма
      </Button>
    </div>
  )
})
export default ShowChatMobileToggle
