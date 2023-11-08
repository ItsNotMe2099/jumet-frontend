import { useAppContext } from 'context/state'
import { RemoveScroll } from 'react-remove-scroll'
import { ModalType } from '@/types/enums'
import MobileMenuModal from '@/components/modals/MobileMenuModal'
import OtpCodeModal from '@/components/modals/OtpCodeModal'
import PasswordChangeModal from '@/components/modals/PasswordChangeModal'
import MapSelectorModal from '@/components/modals/MapSelectorModal'
import DealOfferModal from '@/components/modals/DealOfferModal'
import {ConfirmModal} from '@/components/modals/ConfirmModal'
import Modal, {IModalProps} from '@/components/ui/Modal'
import SaleRequestOfferModal from '@/components/modals/SaleRequestOfferModal'
import {SuccessModal} from '@/components/modals/SuccessModal'
import SaleRequestFormModal from '@/components/modals/SaleRequestFormModal'
import EmployeeFormModal from '@/components/modals/EmployeeFormModal'
import GalleryModal from '@/components/modals/GalleryModal'
import {DealTerminateFormModal} from '@/components/modals/DealTerminateFormModal'
import RepresentativeFormModal from '@/components/modals/RepresentativeFormModal'
import RepresentativeSuccessModal from '@/components/modals/RepresentativeSuccessModal'

interface Props { }

export default function ModalContainer(props: Props) {
  const appContext = useAppContext()
  const commonSettings: IModalProps = {
    onRequestClose: appContext.hideModal,
  }

  return (
    <RemoveScroll enabled={!!appContext.modal}>
      <div aria-hidden="true">
        <Modal isOpen={appContext.modal === ModalType.MobileMenu} {...commonSettings}>
          {appContext.modal === ModalType.MobileMenu && <MobileMenuModal />}
        </Modal>
        <Modal isOpen={appContext.modal === ModalType.OtpCode} {...commonSettings}>
          {appContext.modal === ModalType.OtpCode && <OtpCodeModal onRequestClose={commonSettings.onRequestClose!} />}
        </Modal>
        <Modal isOpen={appContext.modal === ModalType.PasswordChange} {...commonSettings}>
          {appContext.modal === ModalType.PasswordChange && <PasswordChangeModal onRequestClose={commonSettings.onRequestClose!} />}
        </Modal>
        <Modal isOpen={appContext.modal === ModalType.MapSelector} {...commonSettings}>
          {appContext.modal === ModalType.MapSelector && <MapSelectorModal isBottomSheet={false} />}
        </Modal>
        <Modal isOpen={appContext.modal === ModalType.DealOffer} {...commonSettings}>
          {appContext.modal === ModalType.DealOffer && <DealOfferModal onRequestClose={commonSettings.onRequestClose!} />}
        </Modal>
        <Modal isOpen={appContext.modal === ModalType.SaleRequestOffer} {...commonSettings}>
          {appContext.modal === ModalType.SaleRequestOffer && <SaleRequestOfferModal onRequestClose={commonSettings.onRequestClose!} />}
        </Modal>
        <Modal isOpen={appContext.modal === ModalType.SaleRequestForm} {...commonSettings}>
          {appContext.modal === ModalType.SaleRequestForm && <SaleRequestFormModal isBottomSheet={false} />}
        </Modal>
        <Modal isOpen={appContext.modal === ModalType.Confirm} {...commonSettings}>
          {appContext.modal === ModalType.Confirm && <ConfirmModal isBottomSheet={false} />}
        </Modal>
        <Modal isOpen={appContext.modal === ModalType.Success} {...commonSettings}>
          {appContext.modal === ModalType.Success && <SuccessModal isBottomSheet={false} />}
        </Modal>
        <Modal isOpen={appContext.modal === ModalType.EmployeeForm} {...commonSettings}>
          {appContext.modal === ModalType.EmployeeForm && <EmployeeFormModal isBottomSheet={false} />}
        </Modal>
        <Modal isOpen={appContext.modal === ModalType.Gallery} {...commonSettings}>
          {appContext.modal === ModalType.Gallery && <GalleryModal />}
        </Modal>
        <Modal isOpen={appContext.modal === ModalType.DealTerminateForm} {...commonSettings}>
          {appContext.modal === ModalType.DealTerminateForm && <DealTerminateFormModal />}
        </Modal>
        <Modal isOpen={appContext.modal === ModalType.RepresentativeForm} {...commonSettings}>
          {appContext.modal === ModalType.RepresentativeForm && <RepresentativeFormModal />}
        </Modal>
        <Modal isOpen={appContext.modal === ModalType.RepresentativeSuccess} {...commonSettings}>
          {appContext.modal === ModalType.RepresentativeSuccess && <RepresentativeSuccessModal />}
        </Modal>
      </div>
    </RemoveScroll>
  )
}
