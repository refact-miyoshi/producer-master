import React from "react";

interface PinFormProps {
  lat: number;
  lng: number;
  onSave: (data: {
    lat: number;
    lng: number;
    color: string;
    person_in_charge: string;
    status: string;
    details: string;
  }) => void;
}

const PinForm: React.FC<PinFormProps> = ({ lat, lng, onSave }) => {
  const handleSubmit = () => {
    const person_in_charge =
      (document.getElementById("person_in_charge") as HTMLInputElement).value ||
      "";
    const status =
      (document.getElementById("status") as HTMLInputElement).value || "";
    const details =
      (document.getElementById("details") as HTMLTextAreaElement).value || "";
    const selectedColor = (
      document.getElementById("color") as HTMLSelectElement
    ).value;

    onSave({
      lat,
      lng,
      color: selectedColor,
      person_in_charge,
      status,
      details,
    });
  };

  return (
    <form id="popup-form">
      <label htmlFor="person_in_charge">担当:</label>
      <br />
      <input type="text" id="person_in_charge" name="person_in_charge" />
      <br />
      <label htmlFor="status">状況:</label>
      <br />
      <input type="text" id="status" name="status" />
      <br />
      <label htmlFor="details">詳細:</label>
      <br />
      <textarea id="details" name="details"></textarea>
      <br />
      <label htmlFor="color">色:</label>
      <br />
      <select id="color" name="color">
        <option value="red">赤</option>
        <option value="green">緑</option>
        <option value="blue">青</option>
      </select>
      <br />
      <button type="button" onClick={handleSubmit}>
        保存
      </button>
    </form>
  );
};

export default PinForm;
