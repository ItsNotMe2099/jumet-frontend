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
  const sliderOnlyMode = args.images.length < 8
  const [selectedId, setSelectedId] = useState(sliderOnlyMode ? args.selectedId : 0)

  return (
    <div className={classNames({
      [styles.root]: true,
      [styles.withSlider]: selectedId,
    })}>

        <SliderOverlay
          title={args.title}
          images={args.images}
          selectedId={selectedId ?? args.images[0]?.id}
          onRequestClose={() => {
            if (sliderOnlyMode) {
              appContext.hideModal()
            } else {
              setSelectedId(0)
            }
          }}
        />
    </div>
  )
}
