import styles from './index.module.scss'
import { Sticky } from 'react-sticky'
import { forwardRef } from 'react'
import { useRouter } from 'next/router'
import Button from '@/components/ui/Button'
import ChatSvg from '@/components/svg/ChatSvg'
import { colors } from '@/styles/variables'

interface Props {
  isSticky?: boolean
  restProps?: any
  onClick?: () => void
}

const TabBarInner = forwardRef<HTMLDivElement, Props & { style?: any }>((props, ref) => {

  const router = useRouter()

  return (
    <div className={styles.root} ref={ref} style={props.style} {...(props.restProps ?? {})}>
      <Button onClick={props.onClick} className={styles.btn} color='blue' styleType='small' icon={<ChatSvg color={colors.white} />}>
        Чат с пунктом приёма
      </Button>
    </div>
  )
})

TabBarInner.displayName = 'TabBarInner'
export default function TabBar(props: Props) {

  if (props.isSticky) {
    return <Sticky>{({ style, isSticky, ...rest }) => <TabBarInner {...props} restProps={rest} style={style} />}</Sticky>
  } else {
    return <TabBarInner {...props} />
  }
}
