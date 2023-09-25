'use client';

import { Button } from '@/components/ui/button';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import {
  createClientComponentClient,
  User,
} from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useLoadScript } from '@react-google-maps/api';
import { useCallback, useEffect, useState } from 'react';
import { Map } from './map';
import { debounce } from '@/lib/utils';

export default function Location({ user }: { user: User | undefined }) {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markerPos, setMarkerPos] = useState<google.maps.LatLngLiteral>({
    lat: 50.45,
    lng: 30.52,
  });
  const [toponym, setToponym] = useState('');

  useEffect(() => {
    const getLocationDetails = async () => {
      try {
        if (window.google.maps) {
          const geocoder = new window.google.maps.Geocoder();
          const res = await geocoder.geocode({
            location: {
              lat: markerPos.lat,
              lng: markerPos.lng,
            },
          });
          const result = res.results[0].formatted_address;
          if (result) setToponym(result);
        }
      } catch (error) {
        console.log(' :', error);
      }
    };

    getLocationDetails();
  }, [markerPos.lat, markerPos.lng]);

  const handleMapLoad = (map: google.maps.Map) => {
    setMap(map);
  };

  const handleCenterChanged = useCallback(
    debounce(() => {
      if (map) {
        const newCenter = map.getCenter()?.toJSON();
        setMarkerPos(newCenter!);
      }
    }, 1000),
    [map]
  );

  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  async function handleLocation() {
    if (user) {
      await supabase
        .from('profiles')
        .update({
          location: {
            lat: markerPos?.lat,
            long: markerPos?.lng,
            toponym: toponym === '' ? 'Kyiv' : toponym,
          },
        })
        .eq('id', user.id);

      router.push('photos');
    }
  }

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });

  if (!isLoaded) return <div>loading..</div>;
  return (
    <div className='px-4 pt-20 pb-4 h-screen flex flex-col justify-between'>
      <h1 className='text-5xl font-bold mb-4'>Де ви знаходитесь?</h1>

      {isLoaded && (
        <Map
          markerPos={markerPos!}
          onMapLoad={handleMapLoad}
          onCenterChanged={handleCenterChanged}
        />
      )}

      <Button
        onClick={handleLocation}
        size='icon'
        className='rounded-full self-end  bg-purple-400'
      >
        <ChevronRightIcon className='h-4 w-4' />
      </Button>
    </div>
  );
}
