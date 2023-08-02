import styles from './index.module.scss'
import { useAppContext } from 'context/state'
import classNames from 'classnames'
import { RemoveScroll } from 'react-remove-scroll'
import Modal from 'react-modal'
import { ModalType } from '@/types/enums'
import MobileMenuModal from '@/components/modals/MobileMenuModal'
import OtpCodeModal from '@/components/modals/OtpCodeModal'
import PasswordChangeModal from '@/components/modals/PasswordChangeModal'
import MapSelectorModal from '@/components/modals/MapSelectorModal'
import DealOfferModal from '@/components/modals/DealOfferModal'
import {ConfirmModal} from '@/components/modals/ConfirmModal'
import SaleRequestOfferModal from '@/components/modals/SaleRequestOfferModal'

interface Props { }

export default function ModalContainer(props: Props) {
  const appContext = useAppContext()
  const commonSettings = {
    onRequestClose: appContext.hideModal,
    className: styles.modal,
    overlayClassName: classNames([styles.overlay, appContext.modal && styles[appContext.modal]]),
  }

  return (
    <RemoveScroll enabled={!!appContext.modal}>
      <div aria-hidden="true">
        <Modal isOpen={appContext.modal === ModalType.MobileMenu} {...commonSettings}>
          {appContext.modal === ModalType.MobileMenu && <MobileMenuModal />}
        </Modal>
        <Modal isOpen={appContext.modal === ModalType.OtpCode} {...commonSettings}>
          {appContext.modal === ModalType.OtpCode && <OtpCodeModal onRequestClose={commonSettings.onRequestClose} />}
        </Modal>
        <Modal isOpen={appContext.modal === ModalType.PasswordChange} {...commonSettings}>
          {appContext.modal === ModalType.PasswordChange && <PasswordChangeModal onRequestClose={commonSettings.onRequestClose} />}
        </Modal>
        <Modal isOpen={appContext.modal === ModalType.MapSelector} {...commonSettings}>
          {appContext.modal === ModalType.MapSelector && <MapSelectorModal isBottomSheet={false} />}
        </Modal>
        <Modal isOpen={appContext.modal === ModalType.DealOffer} {...commonSettings}>
          {appContext.modal === ModalType.DealOffer && <DealOfferModal onRequestClose={commonSettings.onRequestClose} />}
        </Modal>
        <Modal isOpen={appContext.modal === ModalType.SaleRequestOffer} {...commonSettings}>
          {appContext.modal === ModalType.SaleRequestOffer && <SaleRequestOfferModal onRequestClose={commonSettings.onRequestClose} />}
        </Modal>
        <Modal isOpen={appContext.modal === ModalType.Confirm} {...commonSettings}>
          {appContext.modal === ModalType.Confirm && <ConfirmModal isBottomSheet={false} />}
        </Modal>
      </div>
    </RemoveScroll>
  )
}

