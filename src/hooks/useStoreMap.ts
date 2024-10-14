import mapboxgl from 'mapbox-gl'
import { useReducer } from 'react'
import { myAppLayers } from '../data/mapboxLayers'
import {
  Action,
  GenerateMap,
  MapState,
  RouteKeys,
  RouteRequest,
} from '../types.d'

const initialMapState: MapState = {
  mapObject: undefined,
  mapRoutes: new Set<RouteKeys>(),
  // mapSources: {},
  // mapControl: {},
  // mapAnimation: {},
}

const reducer = (state: MapState, action: Action): MapState => {
  const { type } = action

  if (type === 'SET_MAP') {
    if (!action.payload.mapContainerRef.current || state.mapObject) return state

    const map = new mapboxgl.Map({
      container: action.payload.mapContainerRef.current,
      accessToken: action.payload.mapboxAccessToken,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: [1.6709293166750816, 41.962561859238015], // Vista General
      zoom: 8,
      pitch: 60,
      bearing: 2,
      antialias: true,
      attributionControl: false,
    })

    state.mapObject = map
  }

  if (type === 'LOAD_MAP_STYLES') {
    const map = state.mapObject
    if (map) {
      map.on('style.load', () => {
        if (!map.getSource('mapbox-dem')) {
          map.addSource('mapbox-dem', {
            type: 'raster-dem',
            url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
            tileSize: 512,
            maxzoom: 14,
          })

          map.setTerrain({ source: 'mapbox-dem', exaggeration: 2 })
          map.addControl(new mapboxgl.NavigationControl())

          const layers = map.getStyle()?.layers
          if (layers) {
            layers.forEach((layer) => {
              if (!myAppLayers.includes(layer.id)) {
                map.removeLayer(layer.id)
              }
            })
          }
        }
      })
    }
    return state
  }

  if (type === 'ADD_ROUTE') {
    const map = state.mapObject
    const { routeGeojson, routeName, routeColor } = action.payload

    if (map && !map.getLayer(routeName)) {
      map.addSource(routeName, {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'LineString',
                coordinates: routeGeojson.geometry.coordinates,
              },
            },
          ],
        },
      } as mapboxgl.GeoJSONSourceSpecification)

      map.addLayer({
        id: routeName,
        type: 'line',
        source: routeName,
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': routeColor,
          'line-width': 5,
          'line-opacity': 0.75,
        },
      })

      return {
        ...state,
        mapRoutes: state.mapRoutes.add(routeName),
      }
    }
  }

  return state
}

export const useStoreMap = () => {
  const [state, dispatch] = useReducer<React.Reducer<MapState, Action>>(
    reducer,
    initialMapState
  )

  const setMap = (payload: GenerateMap) => {
    dispatch({ type: 'SET_MAP', payload })
  }

  const loadMapStyles = () => {
    dispatch({ type: 'LOAD_MAP_STYLES' })
  }

  const addRoute = ({ routeGeojson, routeName, routeColor }: RouteRequest) => {
    dispatch({
      type: 'ADD_ROUTE',
      payload: { routeGeojson, routeName, routeColor },
    })
  }

  return {
    state,
    setMap,
    loadMapStyles,
    addRoute,
  }
}
