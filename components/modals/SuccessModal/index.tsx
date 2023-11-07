import styles from './index.module.scss'
import Button from 'components/ui/Button'
import {useAppContext} from 'context/state'
import { SuccessModalArguments} from '@/types/modal_arguments'
import ModalLayout from '@/components/layout/Modal/ModalLayout'
import ModalHeader from '@/components/layout/Modal/ModalHeader'
import ModalBody from '@/components/layout/Modal/ModalBody'
import ModalFooter from '@/components/layout/Modal/ModalFooter'
import SuccessBlock from '@/components/for_pages/Common/SuccessBlock'

interface Props{
  isBottomSheet?: boolean
}
export function SuccessModal(props: Props) {
  const appContext = useAppContext()
  const args = appContext.modalArguments as SuccessModalArguments
  const handleButtonClick = () => {
    if(args.buttonHref){
      return
    }
    if(args.buttonOnClick){
      args.buttonOnClick()
      return
    }
    appContext.hideModal()


  }
  const footer = (<div className={styles.buttons}>
    <Button styleType={'large'} href={args.buttonHref ?? null} color='blue' fluid type="button" onClick={handleButtonClick}>
      {args.buttonName ?? 'Закрыть'}
    </Button>
  </div>)
  const body = (
    <SuccessBlock
      title={args.title}
      text={args.message}
    />
  )


  return (
    <ModalLayout className={styles.modalLayout}  >
      <ModalHeader/>
      <ModalBody>{body}</ModalBody>
      <ModalFooter>{footer}</ModalFooter>
    </ModalLayout>
  )

}
