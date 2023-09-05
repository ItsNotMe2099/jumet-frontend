'use client'
import { useMemo, useRef, useState} from 'react'
import { useReceivingPointSearchContext } from '@/context/receiving_point_search_state'
import { useDataContext } from '@/context/data_state'
import { useAppContext } from '@/context/state'
import ContentLoader from '@/components/ui/ContentLoader'
import {MapProvider, useMap} from '@/context/map-provider'
import {useDebouncedCallback} from 'use-debounce'
import {YMap, YMapLocationRequest} from '@yandex/ymaps3-types'
import MapUtils from '@/utils/MapUtils'
import ReceivingPointMarker from '@/components/for_pages/MainPage/ReceivingPointSearchMap/ReceivingPointMarker'
import {runtimeConfig} from '@/config/runtimeConfig'

export interface ReceivingPointFilterRef {
  clear(): void
}
interface Props{
}
const ReceivingPointSearchMapInner = (props: Props) => {
  const searchContext = useReceivingPointSearchContext()
  const dataContext = useDataContext()
  const appContext = useAppContext()
    console.log('Data111', searchContext.data.data.filter(i => !!i.location).map(item => ([item.location.lng, item.location.lat])))
  const mapRef = useRef<(YMap & { container: HTMLElement }) | null>(null)
  const [selectedId, setSelectedId ] = useState<number | null>(null)
  const startBounds = useMemo(
    () =>
      MapUtils.getBboxByCoordinates(
        searchContext.data.data.map((place) => [place.location.lng, place.location.lat])
      ),
    [searchContext.data]
  )
  const [location] = useState<YMapLocationRequest>(
    startBounds ? { bounds: startBounds } : { center: [55.76, 37.64], zoom: 10 }
  )
  const setBoundsDebounced = useDebouncedCallback(
    (value) => {

    },
    500
  )
  const { reactifyApi } = useMap()

  if (!reactifyApi) return <ContentLoader isOpen={true} style={'fullscreen'} />

  const {
    YMap,
    YMapListener,
    YMapDefaultSchemeLayer,
    YMapDefaultFeaturesLayer,
  } = reactifyApi

  return (
    <YMap margin={[20, 20, 20, 20]} location={location} ref={mapRef}>
      <YMapDefaultSchemeLayer />
      <YMapDefaultFeaturesLayer />

      <YMapListener
        onUpdate={({ location }) => {
       //   setBoundsDebounced(location.bounds)
        }}
      />
      <YMapClusterer
        method={clusterByGrid({ gridSize: 164 })}
        features={points}
        marker={marker}
        cluster={cluster}
      />
      {searchContext.data.data.map((i) => (
        <ReceivingPointMarker
          key={i.id}
          receivingPoint={i}
          mapRef={mapRef}
          reactifyApi={reactifyApi}
          selected={selectedId === i.id}
          selectPlace={(i) => {
            setSelectedId(i)
          }}
        />
      ))}
    </YMap>
  )
}
export default function ReceivingPointSearchMap() {
  return <MapProvider apiUrl={`https://api-maps.yandex.ru/3.0/?apikey=${runtimeConfig.MAP_KEY}&lang=ru_RU`}>
    <ReceivingPointSearchMapInner/>
  </MapProvider>
}
