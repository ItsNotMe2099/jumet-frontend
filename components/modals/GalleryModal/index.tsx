import styles from './index.module.scss'
import { useAppContext } from 'context/state'
import classNames from 'classnames'
import { useState } from 'react'
import SliderOverlay from './SliderOverlay'
import {GalleryModalArguments} from '@/types/modal_arguments'


interface Props {}

export default function GalleryModal(props: Props) {
  const appContext = useAppContext()
  const args = appContext.modalArguments as GalleryModalArguments
  const [selectedSource, setSelectedSource] = useState<string | null>( args.selectedSource )
  console.log('args.images', args.images)
  return (
    <div className={classNames({
      [styles.root]: true,
      [styles.withSlider]: !!selectedSource,
    })}>

        <SliderOverlay
          title={args.title}
          images={args.images}
          selectedSource={selectedSource ?? args.images[0]?.source ?? null}
          onRequestClose={() => {
              appContext.hideModal()
          }}
        />
    </div>
  )
}
