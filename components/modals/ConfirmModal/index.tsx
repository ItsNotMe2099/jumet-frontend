import styles from './index.module.scss'
import Button from 'components/ui/Button'
import {useAppContext} from 'context/state'
import {ConfirmModalArguments} from '@/types/modal_arguments'
import ModalLayout from '@/components/layout/Modal/ModalLayout'
import ModalHeader from '@/components/layout/Modal/ModalHeader'
import ModalBody from '@/components/layout/Modal/ModalBody'
import ModalFooter from '@/components/layout/Modal/ModalFooter'

interface Props{
  isBottomSheet?: boolean
}
export function ConfirmModal(props: Props) {
  const appContext = useAppContext()
  const args = appContext.modalArguments as ConfirmModalArguments
  const handleCancel = () => {
    if(!args.onCancel){
      appContext.hideModal()
    }else{
      args.onCancel()
    }
  }
  const footer = (<div className={styles.buttons}>
    <Button styleType={'large'} color='grey' fluid type="button" onClick={handleCancel}>
      {args.cancel || 'Нет'}
    </Button>
    <Button  styleType={'large'} color='blue' fluid type="button" onClick={args.onConfirm}>
      {args.confirm || 'Да'}
    </Button>
  </div>)
  const body = (
    <div className={styles.text}>{args.text ?? ''}</div>
  )


  return (
    <ModalLayout className={styles.modalLayout}  >
      <ModalHeader/>
      <ModalBody>{body}</ModalBody>
      <ModalFooter>{footer}</ModalFooter>
    </ModalLayout>
  )

}
