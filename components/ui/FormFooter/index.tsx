import styles from './index.module.scss'
import Button from 'components/ui/Button'
import classNames from 'classnames'
import {useAppContext} from '@/context/state'

interface Props {
  spinner?: boolean | undefined,
  onBack?: () => void | null | undefined
  hasBack?: boolean
  backName?: string
  nextName?: string
}

export default function FormFooter(props: Props) {
  const appContext = useAppContext()
  return (
    <div className={classNames( styles.root)}>
      {props.hasBack && <Button className={styles.button} styleType="large" color={'grey'} type="button" disabled={props.spinner} onClick={props.onBack}>
        {props.backName ?? 'Отмена'}
      </Button>}
      <Button className={styles.button} styleType="large" color={'blue'}   type="submit" spinner={props.spinner}>
        {props.nextName ?? 'Сохранить'}
      </Button>
    </div>
  )
}
