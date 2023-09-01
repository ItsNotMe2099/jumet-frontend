import styles from './index.module.scss'
import IconButton from '@/components/ui/IconButton'
import FileDownloadSvg from '@/components/svg/FileDownloadSvg'
import {colors} from '@/styles/variables'
import Link from 'next/link'

interface Props{
  href: string
  label: string
}

export default function FileDownload(props: Props) {
  return  (<Link href={props.href} className={styles.root} target={'_blank'}>
    <IconButton bgColor={'grey300'}>
      <FileDownloadSvg color={colors.blue500}/>
    </IconButton>
    <div className={styles.text}>
      {props.label}
    </div>
  </Link>)
}
