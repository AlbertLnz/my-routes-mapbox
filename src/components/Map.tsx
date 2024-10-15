import { useEffect, useRef, useState } from 'react'
import { routes } from '../data/routes'
import { useStoreMap } from '../hooks/useStoreMap'
import '../styles/map.css'
import { Route, RouteKeys, RoutesCollection } from '../types.d'
import { animationRoute } from '../utils/animationRoute'
import { changeRouteIndex } from '../utils/changeRouteIndex'
import { getRoute } from '../utils/getRoute'
import InfoCard from './InfoCard'
import NavigationButtons from './NavigationButtons'

const mapboxAccessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN!

const Map = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  // const mapRef = useRef<mapboxgl.Map | null>()
  const { state, setMap, loadMapStyles, addRoute } = useStoreMap()
  const [routeIndexSelected, setRouteIndexSelected] = useState(0)
  const [showCardInfo, setShowCardInfo] = useState(false)

  useEffect(() => {
    setMap({ mapboxAccessToken, mapContainerRef })
    loadMapStyles()
  }, [loadMapStyles, setMap])

  const handleRequestRoute = (direction: string) => {
    if (state.mapObject) {
      const routeKeys = Object.keys(routes) as RouteKeys[]
      const newIndex = changeRouteIndex({
        direction,
        routeIndexSelected,
        setRouteIndexSelected,
      })

      const routeName = routeKeys[newIndex]

      if (routeName !== 'General') {
        const route = routes[routeName as keyof RoutesCollection] as Route

        const routeColor = route.difficulty_color as string
        const coordinates = route.coords as number[][]

        getRoute(coordinates, routeName, routeColor, addRoute, state.mapRoutes)
      }

      animationRoute({ map: state.mapObject, routeName })
    }
  }

  const handleShowCardInfo = (value: boolean) => {
    setShowCardInfo(value)
  }

  return (
    <>
      <div id='map' ref={mapContainerRef}></div>
      {routeIndexSelected !== 0 && showCardInfo && (
        <InfoCard routeIndex={routeIndexSelected} />
      )}
      <NavigationButtons
        handleRequestRoute={handleRequestRoute}
        handleShowCardInfo={handleShowCardInfo}
        routeIndexSelected={routeIndexSelected}
      />
    </>
  )
}

export default Map
