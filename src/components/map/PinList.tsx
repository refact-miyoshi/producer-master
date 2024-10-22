import React from "react";

interface Pin {
  person_in_charge: string;
  status: string;
  details: string;
}

const PinList: React.FC<{ selectedPin: Pin | null }> = ({ selectedPin }) => {
  if (!selectedPin) return null;

  return (
    <div style={{ padding: "10px", marginTop: "10px" }}>
      <h4>選択されたピン情報</h4>
      <p>
        <b>担当:</b> {selectedPin.person_in_charge}
      </p>
      <p>
        <b>状況:</b> {selectedPin.status}
      </p>
      <p>
        <b>詳細:</b> {selectedPin.details}
      </p>
    </div>
  );
};

export default PinList;
