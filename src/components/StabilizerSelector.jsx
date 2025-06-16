import React, { useState, useEffect } from "react";

const stabilizers = [
  {
    id: 1,
    name: "스테빌라이저 A",
    price: 15000,
    image: "/images/stabilizerA.png",
    description: "기본형 스테빌라이저로 대부분의 배열에 적합합니다.",
  },
  {
    id: 2,
    name: "스테빌라이저 B",
    price: 25000,
    image: "/images/stabilizerB.png",
    description: "소음을 줄여주는 고급형 스테빌라이저입니다.",
  },
];

export function StabilizerSelector({ onChange, presetSelection }) {
  const [selected, setSelected] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (presetSelection) {
      setSelected(presetSelection);
    } else {
      setSelected(null);
    }
  }, [presetSelection]);

  const handleChange = (e) => {
    const val = e.target.value;
    const selectedItem = stabilizers.find((s) => s.id === parseInt(val));
    setSelected(selectedItem);
    onChange(selectedItem);
  };

  return (
    <div className="p-4 bg-white shadow rounded-xl flex flex-col md:flex-row md:items-start md:gap-6">
      <div className="flex-1">
        <label className="block font-semibold mb-2">스테빌라이저 선택</label>
        <select
          className="w-full border rounded px-3 py-2 mb-4"
          value={selected?.id || ""}
          onChange={handleChange}
        >
          <option value="">선택 안함</option>
          {stabilizers.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name} ({item.price.toLocaleString()}원)
            </option>
          ))}
        </select>

        {selected && (
          <div className="mt-4 flex items-center gap-4">
            <img
              src={selected.image}
              alt={selected.name}
              className="w-20 h-20 object-contain border rounded cursor-pointer"
              onClick={() => setModalOpen(true)}
              onError={(e) => (e.target.src = "/images/no-image.png")}
            />
            <div>
              <p className="font-semibold">{selected.name}</p>
              <p className="text-gray-500">{selected.price.toLocaleString()}원</p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 md:mt-0 md:w-48 text-gray-600 text-sm">
        {selected ? (
          <>
            <p>키보드에 맞는 스테빌라이저를 선택하세요.</p>
            <p className="mt-2 font-semibold text-gray-800">{selected.description}</p>
          </>
        ) : (
          <p>키보드에 맞는 스테빌라이저를 선택하세요.</p>
        )}
      </div>

      {modalOpen && selected && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
          onClick={() => setModalOpen(false)}
        >
          <img
            src={selected.image}
            alt={selected.name}
            className="max-w-full max-h-full rounded"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute top-5 right-5 text-white text-3xl font-bold"
            onClick={() => setModalOpen(false)}
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
}
