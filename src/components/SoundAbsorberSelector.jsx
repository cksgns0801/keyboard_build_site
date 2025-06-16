import React, { useEffect, useState } from "react";

const soundAbsorbers = [
  {
    id: 1,
    name: "폼 흡음재",
    price: 4000,
    image: "/images/soundAbsorber_foam.png",
    description: "소리를 부드럽게 만들어주는 기본 폼 흡음재입니다.",
  },
  {
    id: 2,
    name: "실리콘 흡음재",
    price: 8000,
    image: "/images/soundAbsorber_silicon.png",
    description: "충격과 소음을 효과적으로 차단하는 실리콘 소재입니다.",
  },
];

export function SoundAbsorberSelector({ onChange, presetSelection }) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    if (presetSelection) {
      setSelectedItems(presetSelection);
    } else {
      setSelectedItems([]);
    }
  }, [presetSelection]);

  const handleToggle = (item) => {
    let updated;
    if (selectedItems.find((i) => i.id === item.id)) {
      updated = selectedItems.filter((i) => i.id !== item.id);
    } else {
      updated = [...selectedItems, item];
    }
    setSelectedItems(updated);
    onChange(updated);
  };

  return (
    <div className="p-4 bg-white shadow rounded-xl flex flex-col md:flex-row md:items-start md:gap-6">
      <div className="flex-1">
        <label className="block font-semibold mb-2">흡음재 선택</label>
        <div className="flex flex-col gap-2">
          {soundAbsorbers.map((item) => (
            <label key={item.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedItems.some((i) => i.id === item.id)}
                onChange={() => handleToggle(item)}
              />
              {item.name} ({item.price.toLocaleString()}원)
            </label>
          ))}
        </div>

        {selectedItems.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-4">
            {selectedItems.map((item) => (
              <div key={item.id} className="flex items-center gap-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-contain border rounded cursor-pointer"
                  onClick={() => setModalImage(item.image)}
                  onError={(e) => (e.target.src = "/images/no-image.png")}
                />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-gray-500">{item.price.toLocaleString()}원</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 md:mt-0 md:w-48 text-gray-600 text-sm">
        <p>소리를 흡수하고 타건감을 개선하는 흡음재를 선택해보세요.</p>
        {selectedItems.map((item) => (
          <p key={item.id} className="mt-1 font-semibold text-gray-800">
            {item.description}
          </p>
        ))}
      </div>

      {modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
          onClick={() => setModalImage(null)}
        >
          <img
            src={modalImage}
            alt="흡음재 미리보기"
            className="max-w-full max-h-full rounded"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute top-5 right-5 text-white text-3xl font-bold"
            onClick={() => setModalImage(null)}
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
}
