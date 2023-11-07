import styles from './index.module.scss'
import * as React from 'react'
import DescField from '@/components/ui/DescField'
import ImageFile from '@/components/ui/ImageFile'
import {ModalType, Preset} from '@/types/enums'
import {GalleryModalArguments} from '@/types/modal_arguments'
import {IPassportData} from '@/data/interfaces/IPassportData'
import {useAppContext} from '@/context/state'


interface Props {
  passportData: IPassportData,
  scanModalTitle: string
}

export default function PassportDataViewSection(props: Props) {
  const {passportData} = props
  const appContext = useAppContext()

  return (
    <div className={styles.root}>
      {passportData.scan && <DescField label={'Скан паспорта'} value={<ImageFile preset={Preset.mdResize} onClick={() => appContext.showModal(ModalType.Gallery, {
        title: props.scanModalTitle,
        images: [passportData?.scan],
        selectedId: passportData?.scan!.id
      } as GalleryModalArguments)} className={styles.image} file={passportData.scan}/>}/>}
      <DescField label={'Адрес регистрации'} value={passportData?.address}/>
      <DescField label={'Серия паспорта'} value={passportData?.series}/>
      <DescField label={'Номер паспорта'} value={passportData?.number}/>
      <DescField label={'Кем выдан'} value={passportData?.issuedBy}/>
    </div>
  )
}
