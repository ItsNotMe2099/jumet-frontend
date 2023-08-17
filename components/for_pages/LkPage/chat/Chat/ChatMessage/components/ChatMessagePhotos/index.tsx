import styles from './index.module.scss'
import {ChatMessageProps} from '@/types/types'
import ChatMessageCardLayout from '../ChatMessageCardLayout'
import ImageFile from '@/components/ui/ImageFile'
import {ModalType, Preset} from '@/types/enums'
import {GalleryModalArguments} from '@/types/modal_arguments'
import {useAppContext} from '@/context/state'
import classNames from 'classnames'

interface Props extends ChatMessageProps{
}

export default function ChatMessagePhotos(props: Props) {
  const appContext = useAppContext()
  return <ChatMessageCardLayout message={props.message} side={props.side}>
    <div className={classNames(styles.root, {
      [styles.single]: (props.message.assets?.length ?? 0) === 1,
      [styles.multi]: (props.message.assets?.length ?? 0) > 1
    })}>
      {props.message.assets?.map(i =>  <ImageFile onClick={() => {
        appContext.showModal(ModalType.Gallery, {
          title: 'Фото сообщения',
          images: props.message.assets,
          selectedId: i.id,
        } as GalleryModalArguments)
      }} className={styles.image} preset={Preset.xsResize} key={i.id} file={i} />)}
    </div>
    {props.message.message && <div className={styles.text}>{props.message.message}</div>}
  </ChatMessageCardLayout>
}


