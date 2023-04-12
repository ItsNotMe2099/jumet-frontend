import styles from './index.module.scss'
import { useAppContext } from 'context/state'
import classNames from 'classnames'
import { RemoveScroll } from 'react-remove-scroll'
import { useEffect } from 'react'


interface Props { }

export default function ModalContainer(props: Props) {
  const appContext = useAppContext()
  const commonSettings = {
    onRequestClose: appContext.hideModal,
    className: styles.modal,
    overlayClassName: classNames([styles.overlay, appContext.modal && styles[appContext.modal]]),
  }
  useEffect(() => {
    console.log('ModalContainer')
  }, [])


  console.log('ModalType', appContext.modal)

  return (
    <RemoveScroll enabled={!!appContext.modal}>
      <div aria-hidden="true">

      </div>
    </RemoveScroll>
  )
}

