"use client";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import {
  createClientComponentClient,
  User,
} from "@supabase/auth-helpers-nextjs";
import { usePathname, useRouter } from "next/navigation";
import { useLoadScript } from "@react-google-maps/api";
import { useCallback, useEffect, useState } from "react";
import { Map } from "./map";
import { debounce } from "@/lib/utils";
import { useWindowHeight } from "@/hooks/useWindowHeight";

export default function Location({ user }: { user: User | undefined }) {
  const pathname = usePathname();
  const windowHeight = useWindowHeight();
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markerPos, setMarkerPos] = useState<google.maps.LatLngLiteral>({
    lat: 50.4421673,
    lng: 30.5368004,
  });
  const [toponym, setToponym] = useState("");
  const [userPermission, setUserPermission] = useState(false);
  const [userPos, setUserPos] = useState<google.maps.LatLngLiteral>({
    lat: 50.4421673,
    lng: 30.5368004,
  });

  console.log("userPos :", userPos);
  useEffect(() => {
    const getLocationDetails = async () => {
      try {
        if (window.google.maps) {
          const geocoder = new window.google.maps.Geocoder();

          const res = await geocoder.geocode({
            location: {
              lat: userPermission ? userPos.lat : markerPos.lat,
              lng: userPermission ? userPos.lng : markerPos.lng,
            },
          });
          const result = res.results[0].address_components?.find(
            (component: any) => component.types.includes("locality"),
          )?.long_name;
          if (result) setToponym(result);
        }
      } catch (error) {
        console.log(" :", error);
      }
    };

    getLocationDetails();
  }, [markerPos.lat, markerPos.lng, userPermission, userPos.lat, userPos.lng]);

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
    [map],
  );

  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  async function handleLocation() {
    if (user) {
      console.log("toponym from handleLocation:", toponym);
      await supabase
        .from("profiles")
        .update({
          location: `POINT(${markerPos?.lat} ${markerPos.lng})`,
          toponym: toponym ? toponym : "Київ",
        })
        .eq("id", user.id);

      router.push("prompts");
    }
  }

  const handleUserLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(accessGranted, accessBlocked);
    } else {
      accessBlocked();
    }

    function accessGranted(position: {
      coords: { latitude: number; longitude: number };
    }) {
      const { latitude, longitude } = position.coords;

      setUserPos({
        lat: latitude,
        lng: longitude,
      });

      setUserPermission(true);
    }

    function accessBlocked() {
      setUserPermission(false);
    }
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    language: "uk",
    region: "UA",
  });

  if (pathname !== "/onboarding/location") return;

  return (
    <div
      style={{ height: windowHeight }}
      className="flex h-screen flex-col justify-between p-4"
    >
      <div className="flex flex-col gap-4">
        <h1 className="mb-4 pt-20 text-5xl font-bold">Де ви знаходитесь?</h1>

        {isLoaded && <Button onClick={handleUserLocation}>Знайти мене</Button>}

        {isLoaded ? (
          <Map
            userPos={userPos}
            userPermission={userPermission}
            markerPos={markerPos!}
            onMapLoad={handleMapLoad}
            onCenterChanged={handleCenterChanged}
          />
        ) : (
          <div className="mt-12 h-[400px] w-full animate-pulse rounded-lg bg-gray-300"></div>
        )}
      </div>

      <Button
        onClick={handleLocation}
        size="icon"
        className="self-end rounded-full bg-purple-400"
      >
        <ChevronRightIcon className="h-7 w-7" />
      </Button>
    </div>
  );
}
