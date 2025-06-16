import React, { useEffect, useState } from "react";

const switches = [
  {
    id: 1,
    name: "스위치 A",
    price: 15000,
    colors: ["red", "blue"],
    imageBasePath: "/images/switchA",
    description: "부드럽고 조용한 스위치입니다.",
  },
  {
    id: 2,
    name: "스위치 B",
    price: 20000,
    colors: ["green"],
    imageBasePath: "/images/switchB",
    description: "클릭감이 좋은 스위치입니다.",
  },
];

const defaultDescription = "스위치를 선택하세요.";

export function SwitchSelector({ onChange, presetSelection }) {
  const [selectedSwitch, setSelectedSwitch] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (presetSelection) {
      setSelectedSwitch(presetSelection);
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
      setSelectedSwitch(null);
      setSelectedColor("");
    }
  }, [presetSelection]);

  const handleSwitchChange = (e) => {
    const val = e.target.value;
    if (val === "") {
      setSelectedSwitch(null);
      setSelectedColor("");
      onChange(null);
      return;
    }
    const sw = switches.find((s) => s.id === parseInt(val));
    setSelectedSwitch(sw);
    if (sw && sw.colors.length > 0) {
      setSelectedColor(sw.colors[0]);
      onChange({ ...sw, selectedColor: sw.colors[0] });
    } else {
      setSelectedColor("");
      onChange(sw);
    }
  };

  const handleColorChange = (e) => {
    const color = e.target.value;
    setSelectedColor(color);
    if (selectedSwitch) {
      onChange({ ...selectedSwitch, selectedColor: color });
    }
  };

  const closeModal = () => setModalOpen(false);

  return (
    <div className="p-4 bg-white shadow rounded-xl flex flex-col md:flex-row md:items-start md:gap-6">
      <div className="flex-1">
        <label className="block font-semibold mb-2">스위치 선택</label>
        <select
          className="w-full border rounded px-3 py-2 mb-4"
          value={selectedSwitch?.id || ""}
          onChange={handleSwitchChange}
        >
          <option value="">선택 안함</option>
          {switches.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} ({s.price.toLocaleString()}원)
            </option>
          ))}
        </select>

        {selectedSwitch && selectedSwitch.colors.length > 0 && (
          <>
            <label className="block font-semibold mb-2">색상 선택</label>
            <select
              className="w-full border rounded px-3 py-2 mb-4"
              value={selectedColor}
              onChange={handleColorChange}
            >
              {selectedSwitch.colors.map((color) => (
                <option key={color} value={color}>
                  {color.charAt(0).toUpperCase() + color.slice(1)}
                </option>
              ))}
            </select>

            <div className="mt-4 flex items-center gap-4">
              <img
                src={`${selectedSwitch.imageBasePath}_${selectedColor}.png`}
                alt={`${selectedSwitch.name} - ${selectedColor}`}
                className="w-20 h-20 object-contain border rounded cursor-pointer"
                onClick={() => setModalOpen(true)}
                onError={(e) => (e.target.src = "/images/no-image.png")}
              />
              <div>
                <p className="font-semibold">{selectedSwitch.name}</p>
                <p className="text-gray-500">
                  {selectedSwitch.price.toLocaleString()}원 - 색상:{" "}
                  {selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)}
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="mt-4 md:mt-0 md:w-48 text-gray-600 text-sm">
        {selectedSwitch ? (
          <>
            <p>{defaultDescription}</p>
            <p className="mt-2 font-semibold text-gray-800">{selectedSwitch.description}</p>
          </>
        ) : (
          <p>{defaultDescription}</p>
        )}
      </div>

      {modalOpen && selectedSwitch && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <img
            src={`${selectedSwitch.imageBasePath}_${selectedColor}.png`}
            alt={`${selectedSwitch.name} - ${selectedColor}`}
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
