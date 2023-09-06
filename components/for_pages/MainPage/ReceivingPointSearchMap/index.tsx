import {forwardRef, useCallback, useEffect, useMemo, useRef, useState} from 'react'
import styles from './index.module.scss'
import {useReceivingPointSearchContext} from '@/context/receiving_point_search_state'
import {useDataContext} from '@/context/data_state'
import {useAppContext} from '@/context/state'
import {runtimeConfig} from '@/config/runtimeConfig'
import {Clusterer, Map as YMap, YMaps} from '@pbe/react-yandex-maps'
import {Nullable} from '@/types/types'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'
import ReceivingPointMapPopup from '@/components/for_pages/MainPage/ReceivingPointSearchMap/ReceivingPointMapPopup'
import {MapPortal} from '@/components/for_pages/MainPage/ReceivingPointSearchMap/MapPortal'
import ReceivingPointMarker from '@/components/for_pages/MainPage/ReceivingPointSearchMap/ReceivingPointMarker'
import {YMapsApi} from '@pbe/react-yandex-maps/typings/util/typing'
import {Balloon} from 'yandex-maps'

export interface ReceivingPointFilterRef {
  clear(): void
}

class CustomCluster {
//     // Зададаем макет метки кластера
  createCluster(ymaps) {
    return ymaps.templateLayoutFactory.createClass(
      '<div class="ymap-cluster-icon">{{ properties.geoObjects.length }}</div>',
    )
  }

  // Зададаем активную область иконки кластера
  createIconShape() {
    return {
      type: 'Circle',
      coordinates: [0, 0],
      radius: 25,
    }
  }
}

interface Props {

}

const ReceivingPointSearchMap = forwardRef<ReceivingPointFilterRef, Props>((props, ref) => {
  const searchContext = useReceivingPointSearchContext()
  const dataContext = useDataContext()
  const appContext = useAppContext()
  const mapRef = useRef<ymaps.Map | null>(null)
  const [ymaps, setYmaps] = useState<YMapsApi | null>(null)
  const [map, setMap] = useState<ymaps.Map | null>(null)
  const ballonRef = useRef<Balloon | null>(null)
  useEffect(() => {
    if (!map) {
      return
    }
    const onBallonClose = () => {
      console.log('balloonclose')
      setSelectedReceivingPoint(null)
    }
    const onBallonOpen = (e) => {
      console.log('onBallonOpen', e)
      setTimeout(() => {

      })
      ballonRef.current = e.originalEvent?.currentTarget?.balloon
    }
    map.events.add('balloonopen', onBallonOpen)
    map.events.add('balloonclose', onBallonClose)
    return () => {
      map.events.remove('balloonopen', onBallonOpen)
      map.events.remove('balloonclose', onBallonClose)
    }
  }, [map])
  const [selectedReceivingPoint, setSelectedReceivingPoint] = useState<Nullable<IReceivingPoint>>(null)

  const onMapLoaded = useCallback(
    (ymaps: YMapsApi) => {
      setYmaps(ymaps)
      console.log('mapRef', mapRef.current)
    },
    [setYmaps]
  )
  const handleCloseBallon = () => {
    setSelectedReceivingPoint(null)
    console.log('CloseVallon', ballonRef.current)
    ballonRef.current?.close()
  }
  const handleOpenPortal = () => {
    setTimeout(() => {
      const el = document.getElementById('receiving-point-ballon')
      const offsetLeft = window.innerWidth - (el.getBoundingClientRect().left + el.offsetWidth) - 20
      const offsetTop = window.innerHeight - (el.getBoundingClientRect().top + el.offsetHeight) - 68
      if (offsetLeft < 0 || offsetTop < 0) {
        const centerPixels = map.getGlobalPixelCenter()
        console.log('centerPixels', centerPixels, [
          ...(offsetLeft < 0 ? [centerPixels[0] + Math.abs(offsetLeft)] : [centerPixels[0]]),
          ...(offsetTop < 0 ? [centerPixels[1] + Math.abs(offsetTop)] : [centerPixels[1]])
        ])
        map?.setGlobalPixelCenter([
          ...(offsetLeft < 0 ? [centerPixels[0] + Math.abs(offsetLeft)] : [centerPixels[0]]),
          ...(offsetTop < 0 ? [centerPixels[1] + Math.abs(offsetTop)] : [centerPixels[1]])
        ], map?.getZoom(), {duration: 300})
      }
    }, 200)
  }
  const clusterer = useMemo(() => new CustomCluster(), [])
  console.log('selectedReceivingPoint', selectedReceivingPoint)
  return (<YMaps query={{lang: 'ru_RU', apikey: runtimeConfig.MAP_KEY}}>
      <YMap defaultState={{center: [55.76, 37.64], zoom: 8}}
            instanceRef={setMap}
            onLoad={onMapLoaded}
            className={styles.map}
            controls={[]}
            onBoundsChange={(val: any) => {

            }}
            modules={
              ['Balloon',
               'Clusterer',
                'clusterer.addon.balloon',
                'clusterer.addon.hint',
                'ClusterPlacemark',
                'Collection',
                'collection.Item',
                'control.Button',
                'control.ListBox',
                'control.ListBoxItem',
                'control.Manager',
                'control.TypeSelector',
                'control.ZoomControl',
                'coordSystem.geo',
                'geolocation',
                'geometry.base.Point',
                'geometry.base.Rectangle',
                'geometry.Circle',
                'geometry.pixel.Point',
                'geometry.pixel.Rectangle',
                'geometry.Point',
                'geometry.Polygon',
                'geometry.GeometryCollection',
                'GeoObject',
                'geoObject.addon.balloon',
                'geoObject.addon.editor',
                'geoObject.addon.hint',
                'geoObject.Balloon',
                'geoObject.Hint',
                'GeoObjectArray',
                'GeoObjectCollection',
                'geoQuery',
                'GeoQueryResult',
                'getZoomRange',
                'Hint',

                'Layer',
                'layer.storage',
                'LayerCollection',
                'layout.templateBased.Base',
               'Map',
               'map.addon.balloon',
                'map.addon.hint',
                'map.Balloon',
                'map.behavior.Manager',
                'map.Container',
                'map.Converter',
                'map.Copyrights',
                'map.GeoObjects',
                'map.Hint',
                'map.layer.Manager',
                'map.margin.Manager',
                'map.margin.Accessor',
                'MapEvent',
                'MapType',
                'mapType.storage',
                 'ObjectManager',
                'objectManager.addon.clustersBalloon',
                'objectManager.addon.clustersHint',
                'objectManager.addon.objectsBalloon',
                'objectManager.addon.objectsHint',
                'option.Manager',
                'option.presetStorage',
                'overlay.storage',
                'Placemark',
                'Rectangle',
                'shape.Circle',
                'shape.LineString',
                'shape.MultiPolygon',
                'shape.Polygon',
                'shape.Rectangle',
                'shape.storage',
                'Template',
                'template.filtersStorage',
                'templateLayoutFactory',
                'util.bounds',

              ]  }
            options={{
              suppressMapOpenBlock: true
            }}
            width="100%" height="100%">
        {ymaps && <Clusterer
          options={{
            preset: 'islands#invertedVioletClusterIcons',
            groupByCoordinates: false,
            clusterIconLayout: clusterer.createCluster(ymaps),
            clusterIconShape: clusterer.createIconShape(),
          }}
        >
          {ymaps && searchContext.isLoaded && searchContext.data.total > 0 && searchContext.data.data.filter(i => !!i.location).map((item, index) => (
            <ReceivingPointMarker id={item.id} mapInstanceRef={ymaps} key={item.id} location={item.location}

                                  onClick={(ref) => {

                                    setTimeout(() => {
                                      setSelectedReceivingPoint(item)
                                    }, 10)
                                  }}/>
          ))}
        </Clusterer>}
      </YMap>
      {selectedReceivingPoint &&
        <MapPortal onOpen={handleOpenPortal} elementId={`receiving-point-marker-${selectedReceivingPoint.id}`}>
          <ReceivingPointMapPopup receivingPoint={selectedReceivingPoint} onClose={handleCloseBallon}
                                  style={{}}/>
        </MapPortal>}
    </YMaps>
  )
})
export default ReceivingPointSearchMap
