import React, {forwardRef, KeyboardEventHandler, RefObject} from 'react'
import styles from './index.module.scss'
import {ItemComponentProps} from '@webscopeio/react-textarea-autocomplete'
import { useRef, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import {IField} from 'types/types'
import {useField} from 'formik'
import classNames from 'classnames'
import usePressAndHover from '@/components/hooks/usePressAndHover'
import {useCombinedRefs} from '@/components/hooks/useCombinedRefs'
import FieldError from '@/components/fields/FieldError'
const TextAreaInner = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {autoSize?: boolean, minRows: number}) => {
  if(props.autoSize){
    return <TextareaAutosize {...props as any}/>
  }else{
    return <textarea {...props}/>
  }
}
interface ItemType{
  name: string
  char: string
}
interface ItemProps extends ItemComponentProps<ItemType>{

}

const Item = ({ entity: { name, char } }: ItemProps) => <div>{`${name}: ${char}`}</div>

interface Props extends IField<string>{
  pickerClassName?: string
  className?: string
  onKeyDown?: KeyboardEventHandler
  fieldRef?: RefObject<HTMLTextAreaElement>
  autoSize?: boolean
  minRows?: number
}

const TextAreaField = forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
  const [field, meta, helpers] = useField(props as any)
  const [hoverRef, press, hover] = usePressAndHover()
  const [focused, setFocused] = useState(false)
  const showError = meta.touched && !!meta.error

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null)
  const combinedRefs = useCombinedRefs(textAreaRef, ref)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)



  return (
    <div className={classNames(styles.root, props.className)} data-field={props.name}>
      {props.label && <div className={styles.label}>{props.label}</div>}
      <TextAreaInner
        {...field}
        autoSize={props.autoSize}
        placeholder={props.placeholder}
        minRows={props.minRows ?? 4}
        onFocus={() => {
          setFocused(true)
        }}

        onBlur={() => {
          if (!field.value) {
            setFocused(false)
          }
        }}
        className={classNames({
          [styles.input]: true,
          [styles.inputHover]: hover,
          [styles.inputFocused]: focused || field.value,
          //  [styles.withIcon]: props.iconName,
          [styles.inputError]: showError,
        })}
      />
      <FieldError showError={showError}>{meta.error}</FieldError>
    </div>
  )
})

export default  TextAreaField
