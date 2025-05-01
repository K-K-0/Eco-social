import {useRef, useEffect, useState} from "react";
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

const MAPTILER_KEY = "bs0qTCbmXadT9ZH0pr9h"

const styles = {
    street: `https://api.maptiler.com/maps/streets/style.json?key=${MAPTILER_KEY}`,
    satellite: `https://api.maptiler.com/maps/hybrid/style.json?key=${MAPTILER_KEY}`,
}


const Map = () => {
    const mapContainer = useRef<HTMLDivElement>(null)
    const map = useRef<maplibregl.Map | null>(null)
    const [mapStyle, setMapStyle] = useState<"street" | "satellite">("street")


    useEffect(() => {
        if(map.current) {
            map.current.setStyle(styles[mapStyle])
        }
    }, [mapStyle])


    useEffect(() => {
        if(map.current || !mapContainer.current) return

        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: styles[mapStyle],
            center: [77.209, 28.6139],
            zoom: 9,
        })
    })


    return (
        <div className="relative">
            <div ref={mapContainer}
            className="w-full h-[400px] rounded-lg shadow-md border"
        />

            <button onClick={() => 
                setMapStyle((prev) => (prev === "street" ? "satellite" : "street"))
            }
            className="absolute top-4 right-4 bg-white px-3 py-1 rounded shadow-md text-sm font-medium hover:bg-gray-100"
            >
                {mapStyle === "street" ? "Satellite View" : "Street View"}
            </button>
        </div>
    )
}

export default Map