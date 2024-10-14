import { routes } from '../data/routes'
import { AnimationRoute } from '../types.d'

export const animationRoute = ({ map, routeName }: AnimationRoute) => {
  const route = routes[routeName]

  map.flyTo({
    center: [route.animation.lng, route.animation.lat],
    zoom: route.animation.zoom,
    duration: 3000,
    pitch: route.animation.pitch,
    bearing: route.animation.bearing,
  })
}
