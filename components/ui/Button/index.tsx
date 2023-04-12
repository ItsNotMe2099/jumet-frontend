import styles from './index.module.scss'
import classNames from 'classnames'
import Link from 'next/link'
import Spinner from 'components/ui/Spinner'
import { IButton } from 'types/types'
import { colors } from 'styles/variables'
import { ReactElement, RefObject } from 'react'
import usePressAndHover from '@/components/hooks/usePressAndHover'
import useStopPropagation from '@/components/hooks/useStopPropagation'

interface Props extends IButton {
  children: React.ReactNode
  styleType: 'small' | 'large'
  font?: 'normal15' | 'normal16'
  color?: 'blue' | 'dark' | 'white'
  className?: string
  fluid?: boolean
  buttonRef?: RefObject<any>
  press?: boolean
  hover?: boolean
  stopPropagation?: boolean
  icon?: ReactElement
}

export default function Button(props: Props) {
  const [ref, press, hover] = usePressAndHover()
  useStopPropagation(ref, !props.stopPropagation)

  const cn = classNames({
    [styles.root]: true,
    [styles[props.styleType]]: true,
    ...(props.font ? {[styles[props.font]]: true} : {}),
    [styles.disabled]: props.disabled,
    ...(props.color ? {[styles[props.color]]: true} : {}),
    [styles.fluid]: props.fluid,
    [styles.press]: props.press ?? press,
    [styles.hover]: props.hover ?? hover,
    [styles.withIcon]: !!props.icon
  }, props.className)
  const darkSpinner = props.styleType.includes('outlined')


  if (props.href) {
    return (
      <Link href={props.href}>
        <a
          ref={props.buttonRef ?? ref}
          className={classNames(cn)}
          target={props.isExternalHref ? '_blank' : ''}
          rel={props.isExternalHref ? 'noreferrer' : ''}
          onClick={props.onClick}
        >
           <span className={classNames({
             [styles.text]: true,
             [styles.textHidden]: props.spinner,
           })}>  {props.icon}{props.children}</span>


        </a>
      </Link>
    )
  }

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
      })}>{props.icon}{props.children}</span>
      <div className={classNames({
        [styles.spinner]: true,
        [styles.spinnerVisible]: props.spinner,
      })}>
        {!darkSpinner && <Spinner size={22} color="#fff" secondaryColor="rgba(255,255,255,0.4)"/>}
        {darkSpinner && <Spinner size={22} color={colors.black} secondaryColor={colors.grey500} />}
      </div>
      </button>
  )
}

