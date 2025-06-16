import React, { useEffect, useState } from "react";

const plates = [
  {
    id: 1,
    name: "보강판 A",
    price: 20000,
    colors: ["silver", "black"],
    imageBasePath: "/images/plateA",
    description: "내구성 좋은 기본형 보강판입니다.",
  },
  {
    id: 2,
    name: "보강판 B",
    price: 35000,
    colors: ["gold"],
    imageBasePath: "/images/plateB",
    description: "고급스러운 골드 보강판입니다.",
  },
];

const defaultDescription = "보강판을 선택하세요.";

export function PlateSelector({ onChange, presetSelection }) {
  const [selectedPlate, setSelectedPlate] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (presetSelection) {
      setSelectedPlate(presetSelection);
      if (
        Array.isArray(presetSelection.colors) &&
        presetSelection.colors.length > 0
      ) {
        const color = presetSelection.colors.includes(presetSelection.selectedColor)
          ? presetSelection.selectedColor
          : presetSelection.colors[0];
        setSelectedColor(color);
      } else {
        setSelectedColor("");
      }
    } else {
      setSelectedPlate(null);
      setSelectedColor("");
    }
  }, [presetSelection]);

  const handlePlateChange = (e) => {
    const val = e.target.value;
    if (val === "") {
      setSelectedPlate(null);
      setSelectedColor("");
      onChange(null);
      return;
    }
    const plate = plates.find((p) => p.id === parseInt(val));
    setSelectedPlate(plate);
    if (plate && plate.colors.length > 0) {
      setSelectedColor(plate.colors[0]);
      onChange({ ...plate, selectedColor: plate.colors[0] });
    } else {
      setSelectedColor("");
      onChange(plate);
    }
  };

  const handleColorChange = (e) => {
    const color = e.target.value;
    setSelectedColor(color);
    if (selectedPlate) {
      onChange({ ...selectedPlate, selectedColor: color });
    }
  };

  const closeModal = () => setModalOpen(false);

  return (
    <div className="p-4 bg-white shadow rounded-xl flex flex-col md:flex-row md:items-start md:gap-6">
      <div className="flex-1">
        <label className="block font-semibold mb-2">보강판 선택</label>
        <select
          className="w-full border rounded px-3 py-2 mb-4"
          value={selectedPlate?.id || ""}
          onChange={handlePlateChange}
        >
          <option value="">선택 안함</option>
          {plates.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} ({p.price.toLocaleString()}원)
            </option>
          ))}
        </select>

        {selectedPlate && selectedPlate.colors.length > 0 && (
          <>
            <label className="block font-semibold mb-2">색상 선택</label>
            <select
              className="w-full border rounded px-3 py-2 mb-4"
              value={selectedColor}
              onChange={handleColorChange}
            >
              {selectedPlate.colors.map((color) => (
                <option key={color} value={color}>
                  {color.charAt(0).toUpperCase() + color.slice(1)}
                </option>
              ))}
            </select>

            <div className="mt-4 flex items-center gap-4">
              <img
                src={`${selectedPlate.imageBasePath}_${selectedColor}.png`}
                alt={`${selectedPlate.name} - ${selectedColor}`}
                className="w-20 h-20 object-contain border rounded cursor-pointer"
                onClick={() => setModalOpen(true)}
                onError={(e) => (e.target.src = "/images/no-image.png")}
              />
              <div>
                <p className="font-semibold">{selectedPlate.name}</p>
                <p className="text-gray-500">
                  {selectedPlate.price.toLocaleString()}원 - 색상:{" "}
                  {selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)}
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="mt-4 md:mt-0 md:w-48 text-gray-600 text-sm">
        {selectedPlate ? (
          <>
            <p>{defaultDescription}</p>
            <p className="mt-2 font-semibold text-gray-800">{selectedPlate.description}</p>
          </>
        ) : (
          <p>{defaultDescription}</p>
        )}
      </div>

      {modalOpen && selectedPlate && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <img
            src={`${selectedPlate.imageBasePath}_${selectedColor}.png`}
            alt={`${selectedPlate.name} - ${selectedColor}`}
            className="max-w-full max-h-full rounded"
            onClick={(e) => e.stopPropagation()}
            onError={(e) => (e.target.src = "/images/no-image.png")}
          />
          <button
            className="absolute top-5 right-5 text-white text-3xl font-bold"
            onClick={closeModal}
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
}
