import styles from './index.module.scss'
import { Sticky } from 'react-sticky'
import { forwardRef } from 'react'
import Button from '@/components/ui/Button'
import UserSvg from '@/components/svg/UserSvg'
import { colors } from '@/styles/variables'

interface Props {
  isSticky?: boolean
  restProps?: any
}

const TabBarInner = forwardRef<HTMLDivElement, Props & { style?: any }>((props, ref) => {

  return (
    <div className={styles.root} ref={ref} style={props.style} {...(props.restProps ?? {})}>
      <Button className={styles.btn} styleType='small' color='dark'>
        <UserSvg color={colors.white} />
        <div>Войти</div>
      </Button>
      <Button className={styles.btn} styleType='small' color='blue'>
        Зарегистрироваться
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
