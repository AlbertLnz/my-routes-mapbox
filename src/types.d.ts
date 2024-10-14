import { RefObject } from 'react'

// · Estaría bien que funcionase así, pero da un error (circularly references)

// export type RouteKeys = keyof typeof routes // Opción 1 (❌)

// export type RouteKeys = keyof RoutesCollection // Opción 2 (❌)

export type RouteKeys =
  | 'General'
  | 'PuigsacalmRoute'
  | 'TosadAlpRoute'
  | 'PicaEstatsPinetRoute'
  | 'PuigmalErrRoute' // Opción 3 (🟠): ERRORES AL ASIGNAR UNA RUTA CONCRETA ->  routes[routeName]

// export enum RouteEnum {
//   General = 'General',
//   Puigsacalm = 'PuigsacalmRoute',
//   TosadAlp = 'TosadAlpRoute',
//   PicaEstatsPinet = 'PicaEstatsPinetRoute',
//   PuigmalErr = 'PuigmalErrRoute',
// }
// // Opción 4 (🟠): Y en el routes.ts, especificar
// export type RouteKeys = keyof typeof RouteEnum

export interface RoutesCollection {
  [routeKey: RouteEnum]: Route
}

export interface Route {
  name: string
  image?: string
  distance?: string
  difficulty?: string
  difficulty_color?: string
  total_time?: string
  total_asc?: string
  total_desc?: string
  link_garmin?: string
  gpx?: string
  animation: Animation
  coords?: [number, number][]
}

interface Animation {
  lng: number
  lat: number
  zoom: number
  pitch: number
  bearing: number
}

export interface Map {
  map: mapboxgl.Map
}

export interface MapState {
  mapObject: mapboxgl.Map | undefined
  mapRoutes: Set<RouteKey>
}

export type GenerateMap = {
  mapboxAccessToken: string
  mapContainerRef: RefObject<HTMLDivElement>
}

export interface RouteRequest {
  routeGeojson: {
    type: string
    properties: object
    geometry: {
      type: string
      coordinates: number[][]
    }
  }
  routeName: RouteKey
  routeColor: string
}

export interface AnimationRoute {
  map: mapboxgl.Map
  routeName: RouteKey
}

export type Action =
  | { type: 'INTERCHANGE_LANGUAGES' }
  | { type: 'SET_MAP'; payload: GenerateMap }
  | { type: 'LOAD_MAP_STYLES' }
  | { type: 'ADD_ROUTE'; payload: RouteRequest }
  | { type: 'SET_TO_LANGUAGE'; payload: Language }
