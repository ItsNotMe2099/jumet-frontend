import styles from './index.module.scss'
import classNames from 'classnames'
import IFile from 'data/interfaces/IFile'
import {ReactElement} from 'react'
import FileUploadIconPreview from 'components/fields/Files/components/FileUploadIconPreview'
import {colors} from 'styles/variables'
import CloseSvg from '@/components/svg/CloseSvg'

interface Props {
  isImage?: boolean
  value?: IFile
  previewName?: string
  previewPath?: string
  vertical?: boolean
  progress: number
  error?: string | null
  labelLoading?: string
  onCancel?: () => void
  onDelete?: () => void
  icon?: ReactElement
  stubIcon?: ReactElement

}

export default function FileListItem(props: Props) {
  const getText = (): string | null => {
    if (props.progress > -1) {
      return props.labelLoading ?? `Файл загружается ${props.progress}%`
    }
   return null
  }
  const getButton = (): ReactElement | null => {
    if (props.progress > -1) {
      return <div className={styles.button} onClick={props.onCancel}><CloseSvg color={colors.dark500}/></div>
    }
    if (props.value) {
      return <div className={styles.button} onClick={props.onDelete}><CloseSvg color={colors.dark500}/></div>
    }
    return null
  }

  return (
    <div
      className={classNames({
        [styles.root]: true,
        [styles.vertical]: props.vertical,

      })}
    >
      <FileUploadIconPreview
        progress={props.progress}
        isImage={props.isImage}
        previewPath={props.previewPath}
        previewName={props.previewName}
        value={props.value}/>
      <div className={styles.info}>
          <div className={styles.text}>{getText()}
            {props.error && <div className={styles.error}>{props.error}</div>}
          </div>
        {getButton()}


      </div>
    </div>
  )
}

