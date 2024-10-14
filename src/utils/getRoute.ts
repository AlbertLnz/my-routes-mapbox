import { RouteKey } from '../data/routes'
import { RouteRequest } from '../types'

const mapboxAccessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN!

export const getRoute = async (
  coordinates: number[][],
  routeName: RouteKey,
  routeColor: string,
  addRoute: (request: RouteRequest) => void,
  mapRoutes: Set<RouteKey>
) => {
  const coordinatesString = coordinates
    .map((coord) => coord.join(','))
    .join(';')

  try {
    if (!mapRoutes.has(routeName)) {
      const query = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/walking/${coordinatesString}?steps=true&geometries=geojson&access_token=${mapboxAccessToken}`,
        { method: 'GET' }
      )

      const json = await query.json()
      const data = json.routes[0]
      const route = data.geometry.coordinates
      const routeGeojson = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: route,
        },
      }

      addRoute({
        routeGeojson,
        routeName,
        routeColor,
      })
    }
  } catch (error) {
    console.error('Error fetching route:', error)
  }
}
