import { routes } from '../data/routes'
import { RouteKeys } from '../types.d'

type Props = {
  direction: string
  routeIndexSelected: number
  setRouteIndexSelected: (indexUpdater: (prevIndex: number) => number) => void
}

export const changeRouteIndex = ({
  direction,
  routeIndexSelected,
  setRouteIndexSelected,
}: Props): number => {
  const routeKeys: RouteKeys[] = Object.keys(routes) as RouteKeys[]

  let newIndex: number
  if (direction === '+') {
    newIndex = (routeIndexSelected + 1) % routeKeys.length
  } else {
    newIndex = (routeIndexSelected - 1 + routeKeys.length) % routeKeys.length
  }

  setRouteIndexSelected(() => newIndex)
  return newIndex
}
