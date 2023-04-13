import styles from './index.module.scss'
import { useAppContext } from 'context/state'
import { RemoveScroll } from 'react-remove-scroll'

interface Props { }

export default function BottomSheetContainer(props: Props) {
  const appContext = useAppContext()
  return (
    <RemoveScroll enabled={!!appContext.bottomSheet}>
      <div className={styles.root} aria-hidden="true">
  
      </div>
    </RemoveScroll>
  )
}

