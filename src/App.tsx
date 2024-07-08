import mapboxgl from 'mapbox-gl'
import { useEffect, useRef } from 'react'

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN!

const App = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapContainerRef.current) return

    new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: [2.3878241365316, 42.12541767992249],
      zoom: 12,
      pitch: 60,
      bearing: -60,
      antialias: true,
      attributionControl: false,
    })
  }, [])

  return (
    <div ref={mapContainerRef} style={{ width: '100%', height: '100vh' }}></div>
  )
}

export default App
