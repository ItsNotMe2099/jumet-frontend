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
import { ConfirmModal } from '@/components/modals/ConfirmModal'
import SaleRequestOfferModal from '@/components/modals/SaleRequestOfferModal'

interface Props { }

export default function ModalContainer(props: Props) {
  const appContext = useAppContext()
  const commonSettings = {
    onRequestClose: appContext.hideModal,
    className: styles.modal,
    /*overlayClassName: classNames([styles.overlay, appContext.modal && styles[appContext.modals[appContext.modals.length - 1]]
    ], {[styles.none]: appContext.modals.length && appContext.modals.[appContext.modals.length - 1]}),*/
  }

  return (
    <RemoveScroll enabled={!!appContext.modals}>
      <div aria-hidden="true">
        <Modal overlayClassName={classNames([styles.overlay, appContext.modal && styles[appContext.modals[appContext.modals.length - 1]]
        ], { [styles.none]: appContext.modals.length && appContext.modals[appContext.modals.length - 1] !== ModalType.MobileMenu })} isOpen={appContext.modals.includes(ModalType.MobileMenu)} {...commonSettings}>
          {appContext.modals.includes(ModalType.MobileMenu) && <MobileMenuModal />}
        </Modal>
        <Modal overlayClassName={classNames([styles.overlay, appContext.modal && styles[appContext.modals[appContext.modals.length - 1]]
        ], { [styles.none]: appContext.modals.length && appContext.modals[appContext.modals.length - 1] !== ModalType.OtpCode })} isOpen={appContext.modal === ModalType.OtpCode} {...commonSettings}>
          {appContext.modal === ModalType.OtpCode && <OtpCodeModal onRequestClose={commonSettings.onRequestClose} />}
        </Modal>
        <Modal overlayClassName={classNames([styles.overlay, appContext.modal && styles[appContext.modals[appContext.modals.length - 1]]
        ], { [styles.none]: appContext.modals.length && appContext.modals[appContext.modals.length - 1] !== ModalType.PasswordChange })} isOpen={appContext.modal === ModalType.PasswordChange} {...commonSettings}>
          {appContext.modal === ModalType.PasswordChange && <PasswordChangeModal onRequestClose={commonSettings.onRequestClose} />}
        </Modal>
        <Modal overlayClassName={classNames([styles.overlay, appContext.modal && styles[appContext.modals[appContext.modals.length - 1]]
        ], { [styles.none]: appContext.modals.length && appContext.modals[appContext.modals.length - 1] !== ModalType.MapSelector })} isOpen={appContext.modals.includes(ModalType.MapSelector)} {...commonSettings}>
          {appContext.modals.includes(ModalType.MapSelector) && <MapSelectorModal isBottomSheet={false} />}
        </Modal>
        <Modal overlayClassName={classNames([styles.overlay, appContext.modal && styles[appContext.modals[appContext.modals.length - 1]]
        ], { [styles.none]: appContext.modals.length && appContext.modals[appContext.modals.length - 1] !== ModalType.DealOffer })} isOpen={appContext.modal === ModalType.DealOffer} {...commonSettings}>
          {appContext.modal === ModalType.DealOffer && <DealOfferModal onRequestClose={commonSettings.onRequestClose} />}
        </Modal>
        <Modal overlayClassName={classNames([styles.overlay, appContext.modal && styles[appContext.modals[appContext.modals.length - 1]]
        ], { [styles.none]: appContext.modals.length && appContext.modals[appContext.modals.length - 1] !== ModalType.SaleRequestOffer })} isOpen={appContext.modals.includes(ModalType.SaleRequestOffer)} {...commonSettings}>
          {appContext.modals.includes(ModalType.SaleRequestOffer) && <SaleRequestOfferModal onRequestClose={commonSettings.onRequestClose} />}
        </Modal>
        <Modal overlayClassName={classNames([styles.overlay, appContext.modal && styles[appContext.modals[appContext.modals.length - 1]]
        ], { [styles.none]: appContext.modals.length && appContext.modals[appContext.modals.length - 1] !== ModalType.Confirm })} isOpen={appContext.modal === ModalType.Confirm} {...commonSettings}>
          {appContext.modal === ModalType.Confirm && <ConfirmModal isBottomSheet={false} />}
        </Modal>
      </div>
    </RemoveScroll>
  )
}

