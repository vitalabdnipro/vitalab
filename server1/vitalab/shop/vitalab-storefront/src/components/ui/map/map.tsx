import React from "react"
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api"
import { theme } from "./theme"

const MAP_API_KEY = process.env.NEXT_PUBLIC_MAP_API_KEY

const containerStyle = {
  width: "100%",
  height: "500px",
}

const options = {
  panControl: true,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  clickableIcons: true,
  keyboardShortcuts: false,
  scrollwheel: false,
  disableDoubleClickZoom: true,
  fullscreenControl: false,
  styles: theme,
}

const center = {
  lat: 48.46276399833014,
  lng: 35.03132810385512,
}

const Map = ({ zoom = 17, centers }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: MAP_API_KEY,
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    // const bounds = new window.google.maps.LatLngBounds(center)
    // map.fitBounds(bounds)
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={options}
    >
      {/* Child components, such as markers, info windows, etc. */}
      {centers.map((center) => (
        <MarkerF key={center} position={center} />
      ))}
    </GoogleMap>
  ) : (
    <>Loading...</>
  )
}

export default React.memo(Map)
