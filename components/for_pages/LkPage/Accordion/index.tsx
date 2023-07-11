import { useRouter } from 'next/router'
import styles from './index.module.scss'
import Collapsible from 'react-collapsible'
import classNames from 'classnames'


interface Props {
  link: string
  open: boolean
  text: string
  icon?: React.ReactElement
  children?: React.ReactNode
  onOpen?: () => void
}

export default function Accordion(props: Props) {

  const router = useRouter()

  return (
    <Collapsible onOpen={props.onOpen} open={props.open} trigger={
      <a className={styles.trigger} onClick={() => router.push(props.link)}>
        {props.text}<div className={classNames(styles.icon, {[styles.rotate]: props.open})}>{props.icon}</div></a>}>
      <div className={styles.content}>
        {props.children}
      </div>
    </Collapsible>
  )
}
