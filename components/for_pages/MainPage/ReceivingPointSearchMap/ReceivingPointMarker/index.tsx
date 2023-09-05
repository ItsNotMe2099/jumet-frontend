'use client'

import { YMap } from '@yandex/ymaps3-types'
import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import {ReactifyApi} from '@/context/map-provider'
import MapUtils from '@/utils/MapUtils'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'
import styles from './index.module.scss'
import ReceivingPointMapPopup from '@/components/for_pages/MainPage/ReceivingPointSearchMap/ReceivingPointMapPopup'
interface MarkerWithPopupProps {
  mapRef: React.MutableRefObject<(YMap & { container: HTMLElement }) | null>;
  receivingPoint: IReceivingPoint;
  selected: boolean;
  reactifyApi: ReactifyApi;
  selectPlace: (id: number | null) => void;
}

const ReceivingPointMarker = ({
                           mapRef,
                                receivingPoint,
                           selected,
                           reactifyApi,
                           selectPlace,
                         }: MarkerWithPopupProps) => {
  const markerRef = useRef(null)
  const popupRef = useRef(null)
  const [position, setPosition] = useState<React.CSSProperties>({
    visibility: 'hidden',
    opacity: '0',
  })

  const updatePositionAndShow = useCallback(() => {
    const map = mapRef?.current?.container
    const marker = markerRef?.current
    const popup = popupRef?.current

    if (!map || !marker || !popup) return

    setPosition({
      ...MapUtils.getPopupPosition(map, popup, marker),
      visibility: 'visible',
      opacity: '1',
    })
  }, [mapRef])

  useEffect(() => {
    if (selected) updatePositionAndShow()
  }, [selected, updatePositionAndShow])

  const { YMapMarker } = reactifyApi

  return (
    <YMapMarker
      key={receivingPoint.id}
      zIndex={selected ? 10 : 1}
      coordinates={[receivingPoint.location.lng, receivingPoint.location.lat]}
    >
      <div
        onMouseEnter={() => selectPlace(receivingPoint.id)}
        onMouseLeave={() => selectPlace(null)}
      >
        <div
          ref={markerRef}
          className={styles.marker}
        />
        {selected ? (<ReceivingPointMapPopup onClose={() => selectPlace(null)} ref={popupRef} style={{...position}} receivingPoint={receivingPoint}/>) : null}
      </div>
    </YMapMarker>
  )
}

export default memo(ReceivingPointMarker)
