import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css"; // Leaflet用のCSS
import axios from "axios";
import PinList from "./PinList"; // 新しいコンポーネントをインポート
import PinForm from "./PinForm"; // 新しいコンポーネントをインポート
import ReactDOMServer from "react-dom/server"; // 追加

interface Pin {
  id: number;
  lat: number;
  lng: number;
  color: "red" | "green" | "blue"; // 色の型をリテラル型として定義
  person_in_charge: string;
  status: string;
  details: string;
}

// ピンの画像パスを設定
const pinImagePaths: { [key: string]: string } = {
  red: "/images/pin3.jpg",
  green: "/images/pin2.jpg",
  blue: "/images/pin1.jpg",
};

const MapIntegration: React.FC = () => {
  const [pins, setPins] = useState<Pin[]>([]);
  const [map, setMap] = useState<L.Map | null>(null);
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null); // 選択されたピン情報を保存

  useEffect(() => {
    // DBからピン情報を取得
    axios.get("http://localhost:3001/api/pins").then((response) => {
      setPins(response.data);
    });

    const newMap = L.map("map").setView([34.485331, 133.373091], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(newMap);

    setMap(newMap);

    return () => {
      if (newMap) {
        newMap.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (map) {
      // DBから取得したピンを地図に表示
      pins.forEach((pin) => {
        L.marker([pin.lat, pin.lng], {
          icon: L.icon({
            iconUrl: pinImagePaths[pin.color], // 各ピンの色に対応する画像を使用
            iconSize: [25, 41], // 画像のサイズを調整
            iconAnchor: [12, 41], // ピンの底部が地図の位置に合わせて配置されるように
          }),
        })
          .addTo(map)
          .bindPopup(
            `<b>担当:</b> ${pin.person_in_charge}<br><b>状況:</b> ${pin.status}<br><b>詳細:</b> ${pin.details}`
          )
          .on("click", () => {
            // ピンがクリックされたときに選択されたピン情報を設定
            setSelectedPin(pin);
          });
      });
    }
  }, [map, pins]);

  useEffect(() => {
    if (map) {
      map.on("dblclick", (e) => {
        // クリックイベントをダブルクリックに変更
        const { lat, lng } = e.latlng;

        const marker = L.marker([lat, lng], {
          icon: L.icon({
            iconUrl: pinImagePaths.red, // 初期色のピン画像
            iconSize: [25, 41], // サイズを調整
            iconAnchor: [12, 41], // ピンの底部を地図の位置に合わせる
            shadowUrl: "path/to/marker-shadow.png",
          }),
        })
          .addTo(map)
          .bindPopup(
            ReactDOMServer.renderToString(
              <PinForm
                lat={lat}
                lng={lng}
                onSave={(data) => {
                  // マーカーの色を更新
                  marker.setIcon(
                    L.icon({
                      iconUrl: pinImagePaths[data.color], // 選択された色のピン画像を使用
                      iconSize: [25, 41], // サイズを調整
                      iconAnchor: [12, 41], // ピンの底部を地図の位置に合わせる
                    })
                  );

                  // データベースに新しいピン情報を保存
                  axios
                    .post("http://localhost:3001/api/pins", data)
                    .then(() => {
                      marker.bindPopup(
                        `<b>担当:</b> ${data.person_in_charge}<br><b>状況:</b> ${data.status}<br><b>詳細:</b> ${data.details}`
                      );
                    });
                }}
              />
            )
          )
          .openPopup();
      });
    }
  }, [map]);

  return (
    <div>
      <div id="map" style={{ height: "400px", width: "100%" }}></div>
      <PinList selectedPin={selectedPin} />
    </div>
  );
};

export default MapIntegration;
