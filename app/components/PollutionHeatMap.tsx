"use client";
import { LatLngExpression } from "leaflet";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";


type Report = {
    latitude: number;
    longitude: number;
    category: string;
    location: string;
};

const center: LatLngExpression = [19.0760, 72.8777];

export default function PollutionHeatMap({ reports }: { reports: Report[] }) {

    return (
        <div className="border rounded-xl p-8 bg-white shadow-sm mt-16">

            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Pollution Density Map
            </h2>

            <MapContainer
                center={center}   // Mumbai default
                zoom={11}
                style={{ height: "400px", width: "100%" }}
            >

                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {reports.map((report, index) => (

                    <CircleMarker
                        key={index}
                        center={[report.latitude, report.longitude] as LatLngExpression}
                        radius={8}
                        pathOptions={{ color: "red" }}
                    >

                        <Popup>
                            <strong>{report.category}</strong>
                            <br />
                            {report.location}
                        </Popup>

                    </CircleMarker>

                ))}

            </MapContainer>

        </div>
    );
}