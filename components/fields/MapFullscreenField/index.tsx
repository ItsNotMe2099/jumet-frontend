import {IField} from 'types/types'
import {useState} from 'react'
import styles from './index.module.scss'
import LinkButton from 'components/ui/LinkButton'
import {useField} from 'formik'
import { ModalType} from 'types/enums'
import {useAppContext} from 'context/state'
import {ILocation} from '@/data/interfaces/ILocation'
import {MapSelectorModalArguments} from '@/types/modal_arguments'
import FieldError from '@/components/fields/FieldError'
import YandexStaticMap from '@/components/ui/YandexStaticMap'
interface Props  extends IField<ILocation | null>{
  className?: string
  address?: string
  noMap?: boolean
  helperText?: string
}

export default function MapFullscreenField(props: Props) {
  const [open, setOpen] = useState<boolean>(false)
  const [field, meta, helpers] = useField(props as any)
  const showError = meta.touched && !!meta.error
  const appContext = useAppContext()
  const handleOpen = () => {
    const data: MapSelectorModalArguments = {location: field.value, onChange: (value) => {
     //appContext.hideModal()
      helpers.setValue(value)
    }}
      appContext.showModal(
        ModalType.MapSelector,
        data,
      )
  }
  return (
    <div className={styles.root} data-field={props.name}>
      {props.label && <div className={styles.label}>{props.label}</div>}

      <div className={styles.body}>
        {field.value && !props.noMap && <YandexStaticMap center={field.value} onClick={handleOpen}/>}
        {props.helperText && <div className={styles.helperText}>{props.helperText}</div>}
        <LinkButton type='button' onClick={handleOpen}>{field.value ? 'Изменить' : 'Указать на карте'}</LinkButton>
      </div>
      <FieldError showError={showError}>{meta.error}</FieldError>
    </div>

  )
}
