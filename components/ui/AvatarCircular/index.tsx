import styles from './index.module.scss'
import IFile from 'data/interfaces/IFile'
import classNames from 'classnames'
import {CSSProperties, ReactElement} from 'react'
import { useAppContext } from 'context/state'
import { Preset } from 'types/enums'
import ImageHelper from 'utils/ImageHelper'


interface Props {
  file?: IFile | null
  alt?: string
  size?: number
  sizeXs?: number
  className?: string
  icon?: ReactElement
  initials?: string | null
  color?: string | null
}

export default function AvatarCircular(props: Props) {
  const appContext = useAppContext()
  const inlineStyle: CSSProperties = {}

  if (props.size) {
    inlineStyle.width = props.size
    inlineStyle.height = props.size
    inlineStyle.flexShrink = 0
    inlineStyle.flexBasis = props.size
  }

  if (appContext.isMobile && props.sizeXs) {
    inlineStyle.width = props.sizeXs
    inlineStyle.height = props.sizeXs
    inlineStyle.flexShrink = 0
    inlineStyle.flexBasis = props.sizeXs
  }

  const icon = props.icon
  return (
    <div className={classNames([styles.root,props.className], {[styles.withIcon]: !props.file})} style={inlineStyle}>
      {props.file && <img src={ImageHelper.urlFromFile(props.file, Preset.xsCrop)} alt={props.alt} className={styles.image} />}
      {!props.file && icon}
      {props.initials}
    </div>
  )
}

