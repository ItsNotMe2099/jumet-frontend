'use client'
import React, {useEffect, useMemo, useState} from 'react'
import {Placemark} from '@pbe/react-yandex-maps'
import {YMapsApi} from '@pbe/react-yandex-maps/typings/util/typing'
import {ILocation} from '@/data/interfaces/ILocation'
import {createPinTemplateFactory} from '@/components/for_pages/MainPage/ReceivingPointSearchMap/YaMapCustomPinStyles'
import {createBallonLayoutTemplateFactory} from '@/components/for_pages/MainPage/YaMapCustomBallonLayout'
interface Props {
  onClick: () => void;
  location: ILocation
  mapInstanceRef: YMapsApi ;
  isActive: boolean
  id: number
}
const ReceivingPointMarker = React.memo(
  ({id, mapInstanceRef, onClick, isActive, location}: Props) => {
    // Тут я достаю все данные для моего пина из редакса
    const [isViewed, setViewed] = useState(false)
    useEffect(() => {
      isActive && !isViewed && setViewed(true)
    }, [isActive, isViewed])
    // Тут создаю template для проброса в iconLayout, о createPinTemplateFactory дальше
    const template = createPinTemplateFactory(mapInstanceRef)({
      onClick: onClick,
      isActive,
      isViewed,

    })

    const ballonLayoutTemplate = useMemo(() => createBallonLayoutTemplateFactory(mapInstanceRef)({


    }), [])


    return (
      <Placemark
        // Проброс позиции пина на карте
        geometry={[location.lat, location.lng]}
        properties={{
          balloonContent: `<div class="receiving-point-ballon" id="receiving-point-marker-${id}"></div>`,
        }}
        options={{
          // Проброс темплейта
          iconLayout: template,
          zIndex: isActive ? 100 : 99,
          hideIconOnBalloonOpen: false,
          balloonShadow: false,
          balloonLayout: ballonLayoutTemplate,
          balloonPanelMaxMapArea: 0
        }}
       onClick={onClick}
      />
    )
  },
)
export default ReceivingPointMarker
