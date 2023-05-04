import styles from './index.module.scss'


interface Props {
 file: string
  name?: string
}

export default function DocumentPreview(props: Props) {
  const ext = props.file ? props.file?.split('.')[props.file?.split('.').length - 1]?.toUpperCase() : null
  const extensions = [
    'BMP',
    'CSV',
    'DOC',
    'DOCX',
    'GIF',
    'JPG',
    'JPEG',
    'MOV',
    'MP4',
    'MPEG',
    'PDF',
    'PNG',
    'PPT',
    'PUB',
    'RAR',
    'TIFF',
    'TXT',
    'XSL',
    'ZIP',
  ]
  const isValid = ext ? extensions.includes(ext) : false
 return (
   <div className={styles.root}>
     {!isValid && <div className={styles.ext}>.{ext}</div>}
     {isValid && <div className={styles.icon}><img src={`/images/icons/files/${ext}.svg`}/></div>}
     {props.name && <div className={styles.name}>{props.name}</div>}
   </div>
 )
}

