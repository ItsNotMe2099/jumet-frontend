import styles from './index.module.scss'
import Button from 'components/ui/Button'
import classNames from 'classnames'

interface Props {
  spinner?: boolean | undefined,
  onBack?: () => void | null | undefined
  hasBack?: boolean
  backName?: string
  nextName?: string
}

export default function FormStepFooter(props: Props) {
  return (
    <div className={classNames( styles.root)}>
      <div className={styles.wrapper}>
      {props.hasBack && <Button className={styles.button} styleType="large" color={'grey'} type="button" disabled={props.spinner} onClick={props.onBack}>
          {props.backName ?? 'Назад'}
        </Button>}
        <Button className={styles.button} styleType="large" color={'blue'}   type="submit" spinner={props.spinner}>
          {props.nextName ?? 'Далее'}
        </Button>
        </div>
    </div>
  )
}
