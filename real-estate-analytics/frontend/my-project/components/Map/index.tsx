import React, { useEffect } from "react";
import {
  Circle,
  MapContainer,
  Marker,
  Pane,
  Popup,
  TileLayer,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { formatPrice } from "../../utils/formatText";

const MapLeaflet = (props: any) => {
  return (
    <MapContainer
      center={[
        props.points[0].coordinates.lat,
        props.points[0].coordinates.lng,
      ]}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: 400, width: "100%", borderRadius: "10px" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {props.isHouseCount && (
        <Pane name="custom" style={{ zIndex: 500 }}>
          {props.points.map(
            (point: any, index: number) =>
              point.coordinates && (
                <Circle
                  center={[point.coordinates.lat, point.coordinates.lng]}
                  radius={1200}
                  pathOptions={{
                    color:
                      point.houseCount >= 200
                        ? "red"
                        : point.houseCount < 200 && point.houseCount >= 100
                        ? "orange"
                        : point.houseCount < 100 && point.houseCount >= 50
                        ? "yellow"
                        : "green",
                  }}
                />
              )
          )}
        </Pane>
      )}

      {props.isHousePrice && (
        <Pane name="custom" style={{ zIndex: 500 }}>
          {props.points.map(
            (point: any, index: number) =>
              point.coordinates && (
                <Circle
                  center={[point.coordinates.lat, point.coordinates.lng]}
                  radius={1200}
                  pathOptions={{
                    color:
                      point.insight === "high"
                        ? "red"
                        : point.insight === "medium"
                        ? "orange"
                        : "green",
                  }}
                />
              )
          )}
        </Pane>
      )}

      {props.points.map(
        (point: any, index: number) =>
          point.coordinates && (
            <>
              <Marker
                key={index}
                position={[point.coordinates.lat, point.coordinates.lng]}
                icon={L.icon({
                  iconUrl:
                    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",

                  iconSize:
                    props.isHouseCount || props.isHousePrice
                      ? [10, 10]
                      : [20, 30], // size of the icon
                })}
              >
                <Popup>
                  <div
                    onClick={() => {
                      console.log(point);
                    }}
                  >
                    <p className="font-bold">{point.name}</p>
                    {props.isHouseCount && (
                      <>
                        <p>Số bất động sản đang rao bán:</p>
                        <p className="text-center font-bold">
                          {point.houseCount}
                        </p>
                      </>
                    )}

                    {props.isHousePrice && (
                      <>
                        <p>Giá trung bình trong {point.name} :</p>
                        <p className="text-center font-bold">
                          {formatPrice(point.average_price)} VND
                        </p>
                      </>
                    )}
                  </div>
                </Popup>
              </Marker>
            </>
          )
      )}
    </MapContainer>
  );
};

export default MapLeaflet;
