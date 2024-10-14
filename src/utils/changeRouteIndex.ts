import { RouteKey, routes } from '../data/routes'

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
  const routeKeys: RouteKey[] = Object.keys(routes) as RouteKey[]

  let newIndex: number
  if (direction === '+') {
    newIndex = (routeIndexSelected + 1) % routeKeys.length
  } else {
    newIndex = (routeIndexSelected - 1 + routeKeys.length) % routeKeys.length
  }

  setRouteIndexSelected(() => newIndex)
  return newIndex
}
