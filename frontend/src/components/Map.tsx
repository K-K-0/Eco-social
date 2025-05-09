import {useRef, useEffect, useState} from "react";
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import axios from "axios";
import NavBar from "./NavBar";
import OrgCard from "./OrgFollow";
import { X } from 'lucide-react'

const MAPTILER_KEY = "bs0qTCbmXadT9ZH0pr9h"

const styles = {
    street: `https://api.maptiler.com/maps/streets/style.json?key=${MAPTILER_KEY}`,
    satellite: `https://api.maptiler.com/maps/hybrid/style.json?key=${MAPTILER_KEY}`,
}

type Org = { 
    id: string;
    name: string;
    description: string;
    latitude: number;
    longitude: number;
    followers: any
}


const Map = () => {
    const mapContainer = useRef<HTMLDivElement>(null)
    const map = useRef<maplibregl.Map | null>(null)
    const [mapStyle, setMapStyle] = useState<"street" | "satellite">("street")
    const [orgs, setOrgs] = useState<Org[]>([])
    const [ selectedOrg, setSelectedOrg ] = useState<Org | null>(null)

 
    useEffect(() => {
        const fetchOrg = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/eco-orgs', {withCredentials: true})
                console.log("fetch data", res.data)
                setOrgs(res.data)
            } catch (error) {
                console.error("Error fetching orgs:", error);
            }
        }
        fetchOrg()        
    }, [])

    useEffect(() => {
        if(map.current) {
            map.current.setStyle(styles[mapStyle])
        }
    }, [mapStyle])

    useEffect(() => {
        
        if (map.current || !mapContainer.current) return;

        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: styles.street,
            center: [77.209, 28.6139],
            zoom: 9,
        });
    }, [orgs]);

    useEffect(() => {
        if (!map.current || orgs.length === 0) return
        function createCustomMarker(imageUrl: string) {
            const el = document.createElement("div");
            el.style.backgroundImage = `url(${imageUrl})`
            el.style.width = "40px";
            el.style.height = "40px";
            el.style.backgroundSize = "contain";
            el.style.borderRadius = "50%";
            return el;
        }

        orgs.forEach((org) => {
            console.log("hello")

            const marker = new maplibregl.Marker({ color: "#10B981"})
            .setLngLat([org.longitude, org.latitude])
            .addTo(map.current!)
            marker.getElement().addEventListener('click', () => {
                setSelectedOrg(org)
            })
           
        })
    }, [orgs])





    return (
        <div className="">
            <NavBar/>
            <div ref={mapContainer}
            className="w-[1919px] h-[852px]"
        />

            <button onClick={() => 
                setMapStyle((prev) => (prev === "street" ? "satellite" : "street"))
            }
            className="absolute top-4 mt-40 right-4 bg-white px-3 py-1 rounded shadow-md text-sm font-medium hover:bg-gray-100"
            >
                {mapStyle === "street" ? "Satellite View" : "Street View"}
            </button>

            {selectedOrg && (
                <div className="absolute left-40 top-50 w-full max-w-sm  border border-gray-200 rounded-2xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
                    
                    <button onClick={() => setSelectedOrg(null)}
                        title=" nothing" className="text-sm text-black cursor-pointer hover:text-red-500 ml-88 mt-1"><X className="cursor-pointer"/> </button>
                    <OrgCard org={selectedOrg} />
                </div>
            )}
        </div>
    )
}

export default Map