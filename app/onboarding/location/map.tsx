import { GoogleMap, MarkerF } from '@react-google-maps/api';

interface MapProps {
  markerPos: google.maps.LatLngLiteral;
  onMapLoad: (map: google.maps.Map) => void;
  onCenterChanged: () => void;
}

export const Map: React.FC<MapProps> = ({
  markerPos,
  onMapLoad,
  onCenterChanged,
}) => {
  return (
    <GoogleMap
      mapContainerStyle={{
        width: '100%',
        height: '500px',
      }}
      onLoad={onMapLoad}
      center={markerPos}
      zoom={8}
      onCenterChanged={onCenterChanged}
    >
      <MarkerF position={markerPos} />
    </GoogleMap>
  );
};
