import styles from './index.module.scss'
import classNames from 'classnames'
import { IButton } from 'types/types'
import { RefObject } from 'react'
import Spinner from '@/components/ui/Spinner'

interface Props extends IButton{
  children: React.ReactNode
  className?: string
  buttonRef?: RefObject<any>
  bgColor?: 'transparent' | 'white' | 'grey400' | 'grey300' | 'dark400' | 'blue500'
  size?: 'normal' | 'medium' | 'large'
}

export default function IconButton(props: Props) {
  if (props.onClick && props.href) {
    console.warn('IconButton: must have either onClick or href') // eslint-disable-line
  }

  if (props.href) {
    return (
      <a // eslint-disable-line
        ref={props.buttonRef}
        href={typeof props.href == 'object' ? props.href.href! : props.href}
        target={props.isExternalHref ? '_blank' : ''}
        rel={props.isExternalHref ? 'noreferrer' : ''}
        className={classNames([styles.root, props.className],  props.bgColor && styles[props.bgColor], styles[props.size ?? 'normal'])}
        onClick={(e) => props.onClick?.(e)}
      >
        {props.children}
      </a>
    )
  }

  return (
    <button
      ref={props.buttonRef}
      className={classNames([styles.root, props.className], props.bgColor && styles[props.bgColor], styles[props.size ?? 'normal'])}
      type={props.type ?? 'button'}
      form={props.form}
      onClick={(e) => props.onClick?.(e)}
    >
      <span className={classNames({
        [styles.text]: true,
        [styles.textHidden]: props.spinner,
      })}>{props.children}</span>
      <div className={classNames({
        [styles.spinner]: true,
        [styles.spinnerVisible]: props.spinner,
      })}>
         <Spinner size={22} color="#fff" secondaryColor="rgba(255,255,255,0.4)" />
      </div>
    </button>
  )
}

