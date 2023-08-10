import styles from 'components/fields/Files/components/FileUploadDropzone/index.module.scss'
import classNames from 'classnames'
import {ReactElement, useState} from 'react'
import DropzoneOverlay from 'components/fields/Files/components/DropzoneOverlay'
import {colors} from 'styles/variables'
import {DropEvent, DropzoneOptions, FileRejection, useDropzone} from 'react-dropzone'
import AttachSvg from '@/components/svg/AttachSvg'
import AddImageSvg from '@/components/svg/AddImageSvg'


interface Props  extends  DropzoneOptions{
  isImage?: boolean
  title?: string | ReactElement
  description?: string
  showDropzone?: boolean
  icon?: ReactElement
}

export default function FileUploadDropzone(props: Props) {
  const [error, setError] = useState<string | null>(null)
  const onDropRejected = (fileRejections: FileRejection[], event: DropEvent) => {
    console.log('fileRejections', fileRejections, props)
    if(fileRejections.length > 0 && fileRejections[0].errors.length > 0){
      setError(fileRejections[0].errors[0].message)
    }
  }
  const {getRootProps, getInputProps, isDragActive, ...rest} = useDropzone({
   ...props,
    onDropRejected,
  } as any)
  const getIcon = (): ReactElement => {
    if(props.icon){
      return props.icon
    }
    if(props.isImage){
      return <AddImageSvg className={styles.icon} color={colors.grey500}/>
    }else{
      return <AttachSvg className={styles.icon} color={colors.grey500}/>
    }

  }
  return (
    <div className={classNames(styles.root)} {...getRootProps()}>
      <input {...getInputProps()} />
      {getIcon()}
      <div className={styles.info}>
        <div className={styles.title}> {props.title ?? 'Загрузить фото'}</div>
        {props.description && <div className={styles.description}>{props.description}</div>}
      </div>
      {error && <div className={styles.error}>{error}</div>}
      {isDragActive && <DropzoneOverlay show={isDragActive} title={'Загрузить фото'}/>}
    </div>
  )
}

