import React from "react";

export default function HousingSelector({ 
  housingItems, 
  selectedHousing, 
  onSelect, 
  housingColor, 
  onColorChange, 
  disabledItems = [] 
}) {
  const colorOptionsByHousing = {
    "플라스틱 하우징": ["#ffffff", "#000000", "#ff0000", "#0000ff"],
    "아크릴 하우징": ["#ffffff", "#00ff00", "#0000ff"],
    "알루미늄 하우징": ["#c0c0c0", "#a0a0a0", "#000000"],
  };

  const allowedColors = selectedHousing ? colorOptionsByHousing[selectedHousing.name] || [] : [];

  // 비활성화된 항목은 목록에서 제외
  const filteredItems = housingItems.filter(item => !disabledItems.includes(item.name));

  return (
    <div>
      <h2 className="font-semibold text-lg mb-2">HOUSING</h2>
      <div className="flex gap-4 mb-4">
        {filteredItems.map((item, idx) => {
          const selected = selectedHousing?.name === item.name;
          return (
            <div
              key={idx}
              onClick={() => onSelect(item)}
              className={`relative p-2 border rounded cursor-pointer transition ${
                selected ? "border-blue-500 bg-blue-50" : ""
              }`}
            >
              {selected && (
                <div className="absolute top-1 right-1 text-green-500">✅</div>
              )}
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover mb-1"
              />
              <div className="text-sm">{item.name}</div>
              <div className="text-xs text-gray-500">
                ₩{item.price.toLocaleString()}
              </div>
            </div>
          );
        })}
      </div>

      {selectedHousing && allowedColors.length > 0 && (
        <div className="mb-4">
          <label className="block font-semibold mb-1">하우징 색상 선택</label>
          <div className="flex gap-2">
            {allowedColors.map((color, i) => (
              <button
                key={i}
                onClick={() => onColorChange(color)}
                style={{
                  backgroundColor: color,
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  border: color === housingColor ? "3px solid #000" : "1px solid #ccc",
                  cursor: "pointer",
                }}
                aria-label={`Select housing color ${color}`}
                type="button"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
