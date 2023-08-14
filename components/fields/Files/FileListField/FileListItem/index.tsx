import styles from './index.module.scss'
import classNames from 'classnames'
import IFile from 'data/interfaces/IFile'
import {ReactElement} from 'react'
import FileUploadIconPreview from 'components/fields/Files/components/FileUploadIconPreview'
import {colors} from 'styles/variables'
import CloseSvg from '@/components/svg/CloseSvg'
import {Line} from 'rc-progress'
import Formatter from '@/utils/formatter'

interface Props {
  isImage?: boolean
  value?: IFile | null
  previewName?: string | undefined
  previewPath?: string | undefined
  previewSize?: number | undefined
  progress: number
  error?: string
  labelLoading?: string
  onCancel?: () => void
  onDelete?: () => void
  icon?: ReactElement
  stubIcon?: ReactElement
  className?: string

}

export default function FileListItem(props: Props) {

  const getButton = (): ReactElement | null => {
    if (props.progress > -1) {
      return <div className={styles.button} onClick={props.onCancel}><CloseSvg color={colors.grey500}/></div>
    }
    if (props.value) {
      return <div className={styles.button} onClick={props.onDelete}><CloseSvg color={colors.grey500}/></div>
    }
    return null
  }

  return (
    <div
      className={classNames({
        [styles.root]: true,

      }, props.className)}
    >

      <FileUploadIconPreview
        progress={props.progress}
        isImage={props.isImage}
        previewPath={props.previewPath}
        previewName={props.previewName}
        value={props.value}/>
      <div className={styles.center}>
        <div className={styles.left}>
          <div className={styles.info}>
            <div className={styles.name}>{props.previewName ?? props.value?.name}{ props.previewSize ? ` ${Formatter.formatSize( props.previewSize )}` : ''}</div>
            {props.error && <div className={styles.error}>{props.error}</div>}
          </div>
          {getButton()}
        </div>


        <Line className={styles.progress} percent={props.progress} trailWidth={1} strokeWidth={1} strokeColor={colors.blue500}
              trailColor={colors.grey300}/>

      </div>

    </div>
  )
}

