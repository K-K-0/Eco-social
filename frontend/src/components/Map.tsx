import {useRef, useEffect, useState} from "react";
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import axios from "axios";

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
}


const Map = () => {
    const mapContainer = useRef<HTMLDivElement>(null)
    const map = useRef<maplibregl.Map | null>(null)
    const [mapStyle, setMapStyle] = useState<"street" | "satellite">("street")
    const [orgs, setOrgs] = useState<Org[]>([])
 
    useEffect(() => {
        const fetchOrg = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/eco-orgs')
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

        const customPopupHTML = (org) => `
            <div class="relative p-4 max-w-xs text-sm text-gray-800 rounded-lg bg-white shadow-lg">
                <button class="absolute top-2 right-2 text-gray-400 hover:text-red-500" onclick="this.closest('div').remove()">
                &times;
                </button>
                <div class="font-semibold text-green-700 text-base">${org.name}</div>
                <p class="mt-1 text-gray-600">${org.description || "No description provided."}</p>
            </div>
            `;


        orgs.forEach((org) => {
            console.log("hello")

            const marker = new maplibregl.Marker({ color: "#10B981"})
            .setLngLat([org.longitude, org.latitude])
            .setPopup( new maplibregl.Popup({closeButton: false, closeOnClick: false, className: "custom-popup"}).setHTML(`
                
                
                
                <div class="bg-green-100 border border-green-400 text-green-800 p-4 rounded py-2 px-2 w-full h-fit">
                    <div class="text-green-800">${org.name}</div>
                    <div class="text-green-8">${org.description || ""}</div>   
                </div> 
            
            
            
            
            
            
            
            
            
            
                `)).addTo(map.current!)       
        })
    }, [orgs])





    return (
        <div className="relative">
            <div ref={mapContainer}
            className="w-full h-[600px] rounded-lg shadow-md border"
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