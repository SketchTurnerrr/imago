import { GoogleMap, MarkerF } from '@react-google-maps/api';

interface IMap {
  markerPos: google.maps.LatLngLiteral;
  userPos: google.maps.LatLngLiteral;
  onMapLoad: (map: google.maps.Map) => void;
  onCenterChanged: () => void;
  userPermission: boolean;
}

export const Map: React.FC<IMap> = ({
  markerPos,
  userPos,
  onMapLoad,
  onCenterChanged,
  userPermission,
}) => {
  return (
    <GoogleMap
      mapContainerStyle={{
        width: '100%',
        height: '400px',
      }}
      onLoad={onMapLoad}
      center={userPermission ? userPos : markerPos}
      zoom={8}
      onCenterChanged={onCenterChanged}
    >
      {userPermission ? (
        <MarkerF position={userPos} />
      ) : (
        <MarkerF position={markerPos} />
      )}
    </GoogleMap>
  );
};
