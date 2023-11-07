import styles from './index.module.scss'
import classNames from 'classnames'
import Spinner from 'components/ui/Spinner'
import { IButton } from 'types/types'
import { colors } from 'styles/variables'
import React, { RefObject } from 'react'
import SendSvg from 'components/svg/SendSvg'
import usePressAndHover from '@/components/hooks/usePressAndHover'
import useStopPropagation from '@/components/hooks/useStopPropagation'

interface Props extends IButton {

   className?: string
  buttonRef?: RefObject<any>
  press?: boolean
  hover?: boolean
  stopPropagation?: boolean

}

export default function ChatMessageSendButton(props: Props) {
  const [ref, press, hover] = usePressAndHover()
  useStopPropagation(ref, !props.stopPropagation)

  const cn = classNames({
    [styles.root]: true,
    [styles.disabled]: props.disabled,
    [styles.press]: props.press ?? press,
    [styles.hover]: props.hover ?? hover,
  }, props.className)



  return (
    <button
      ref={props.buttonRef ?? ref}
      type={props.type}
      form={props.form}
      onClick={(e) => {
        if (props.stopPropagation) {
          e.stopPropagation()
        }
        if (props.onClick && !props.spinner && !props.disabled) {
          props.onClick(e)
        }
      }}
      disabled={props.disabled}
      className={classNames(cn)}
    >
      <span className={classNames({
        [styles.text]: true,
        [styles.textHidden]: props.spinner,
      })}><SendSvg color={hover ? colors.dark400 : colors.dark500}/></span>
      <div className={classNames({
        [styles.spinner]: true,
        [styles.spinnerVisible]: props.spinner,
      })}>
        <Spinner size={16} color={colors.dark400} secondaryColor={colors.dark400} />
      </div>
       </button>
  )
}

