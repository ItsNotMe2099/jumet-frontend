import {IField} from 'types/types'
import styles from './index.module.scss'
import LinkButton from 'components/ui/LinkButton'
import {useField} from 'formik'
import { ModalType} from 'types/enums'
import {useAppContext} from 'context/state'
import {ILocation} from '@/data/interfaces/ILocation'
import {MapSelectorModalArguments} from '@/types/modal_arguments'
import FieldError from '@/components/fields/FieldError'
import classNames from 'classnames'
import ClearSvg from '@/components/svg/ClearSvg'
import {colors} from '@/styles/variables'
import Spacer from '@/components/ui/Spacer'
interface Props  extends IField<ILocation | null>{
  className?: string
  resettable?: boolean
  onChange: (value: ILocation | null) => void
}

export default function LocationSuggestionField(props: Props) {
  const [field, meta, helpers] = useField<ILocation | null>(props as any)
  const showError = meta.touched && !!meta.error
  const appContext = useAppContext()
  const handleOpen = () => {
    const data: MapSelectorModalArguments = {location: field.value, onChange: (value) => {
     //appContext.hideModal()
      helpers.setValue(value)
        props.onChange?.(value)
    }}
      appContext.showModal(
        ModalType.MapSelector,
        data,
      )
  }
  const handleClear = () => {
    helpers.setValue(null)
    props.onChange?.(null)
  }
  const showClear = props.resettable && !!field.value
  return (
    <div className={styles.root} data-field={props.name}>
      {props.label && <div className={styles.label}>{props.label}</div>}
       <div className={classNames(styles.body, {[styles.withClear]: showClear})}>
         {!field.value && <div className={styles.empty}>Координаты не определны</div>}
         {field.value && <div className={styles.value}>{field.value?.lat},{field.value?.lng}</div>}

         <LinkButton type='button' onClick={handleOpen}>{field.value ? 'Изменить' : 'Выбрать'}</LinkButton>
         {showClear && <><Spacer/><div className={classNames(styles.clear)} onClick={handleClear}><ClearSvg className={styles.clearIcon} color={colors.grey500}/></div></>}

       </div>
      <FieldError showError={showError}>{meta.error}</FieldError>
    </div>

  )
}
