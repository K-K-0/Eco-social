import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "https://your-backend.com"; // Fallback URL

type Tree = {
    id: number;
    latitude: number;
    longitude: number;
};

type EcoOrg = {
    id: number;
    name: string;
    description: string;
    location: string;
    latitude: number;
    longitude: number;
};

export default function TreesMap() {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<maplibregl.Map | null>(null);
    const [trees, setTrees] = useState<Tree[]>([]);
    const [ecoOrgs, setEcoOrgs] = useState<EcoOrg[]>([]);

    // Fetch data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [treeRes, orgRes] = await Promise.all([
                    axios.get(`${BASE_URL}/api/tree/all-trees`, { withCredentials: true }),
                    axios.get(`${BASE_URL}/api/eco-orgs/all-verified-orgs`, { withCredentials: true }),
                ]);

                setTrees(treeRes.data.trees || []);
                setEcoOrgs(orgRes.data.verifiedOrgs || []);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    // Initialize map
    useEffect(() => {
        if (!mapContainer.current || mapRef.current) return;

        mapRef.current = new maplibregl.Map({
            container: mapContainer.current,
            style: `https://api.maptiler.com/maps/streets/style.json?key=${import.meta.env.VITE_MAPTILER_KEY}`,
            center: [78.9629, 20.5937],
            zoom: 4,
        });

        mapRef.current.addControl(new maplibregl.NavigationControl(), "top-right");
    }, []);

    // Add markers when map + data ready
    useEffect(() => {
        const map = mapRef.current;
        if (!map || !trees.length || !ecoOrgs.length || !map.isStyleLoaded()) return;

        // Remove old markers if any
        document.querySelectorAll(".tree-marker, .org-marker").forEach((el) => el.remove());

        // Add tree markers
        trees.forEach((tree) => {
            const el = document.createElement("div");
            el.className = "tree-marker";
            el.innerHTML = "🌳";

            new maplibregl.Marker(el).setLngLat([tree.longitude, tree.latitude]).addTo(map);
        });

        // Add org markers
        ecoOrgs.forEach((org) => {
            const el = document.createElement("div");
            el.className = "org-marker custom-org-marker";

            new maplibregl.Marker(el).setLngLat([org.longitude, org.latitude]).addTo(map);
        });
    }, [trees, ecoOrgs]);

    return (
        <div className="w-full h-[600px] flex items-center justify-center bg-gray-100">
            <div ref={mapContainer} className="flex-1 w-full h-[600px]" />

            {/* Prevent Tailwind from purging this class */}
            <span className="hidden custom-org-marker"></span>
        </div>
    );
}
