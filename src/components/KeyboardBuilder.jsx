import React, { useState, useEffect } from "react";

const layouts = [
  { id: "60", name: "60% 배열", image: "/images/layout/layout60.png" },
  { id: "65", name: "65% 배열", image: "/images/layout/layout65.png" },
  { id: "80", name: "80% 배열", image: "/images/layout/layout80.png" },
];

const housingColors = {
  "gh60 플라스틱": [
    { name: "투명화이트", colorCode: "rgba(206, 200, 200, 0.62)" },
    { name: "투명블랙", colorCode: "rgba(24, 19, 19, 0.75)" },
    { name: "화이트", colorCode: "rgb(255, 255, 255)" },
    { name: "블랙", colorCode: "rgb(0, 0, 0)" },
    { name: "레드", colorCode: "rgb(224, 31, 47)" },
    { name: "핑크", colorCode: "rgb(231, 105, 231)" },
    { name: "블루", colorCode: "rgb(58, 61, 231)" },
  ],
  "Tofu60 redux": [
    { name: "Anodized Dark Blue", colorCode: "rgba(206, 200, 200, 0.62)" },
    { name: "Anodized Black", colorCode: "rgba(24, 19, 19, 0.75)" },
    { name: "Anodized Silver", colorCode: "rgb(255, 255, 255)" },
    { name: "Anodized Gray", colorCode: "rgb(0, 0, 0)" },
    { name: "Anodized Maroon", colorCode: "rgb(224, 31, 47)" },
    { name: "Anodized Green", colorCode: "rgb(231, 105, 231)" },
    { name: "E-coating White", colorCode: "rgb(58, 61, 231)" },
    { name: "E-coating Pink", colorCode: "rgba(206, 200, 200, 0.62)" },
    { name: "E-coating Purple", colorCode: "rgba(24, 19, 19, 0.75)" },
    { name: "E-coating Orange", colorCode: "rgb(255, 255, 255)" },
    { name: "Acrylic", colorCode: "rgb(0, 0, 0)" },
    { name: "Red with glitter", colorCode: "rgb(224, 31, 47)" },
    { name: "White with glitter", colorCode: "rgb(231, 105, 231)" },
    { name: "Meteorite Gray", colorCode: "rgb(58, 61, 231)" },
    { name: "Anodized Dark Purple", colorCode: "rgb(255, 255, 255)" },
    { name: "Anodized Mocha", colorCode: "rgb(0, 0, 0)" },
    { name: "Anodized Grass Green", colorCode: "rgb(224, 31, 47)" },
    { name: "E-coating Pink", colorCode: "rgb(231, 105, 231)" },
    { name: "E-coating Baby Blue", colorCode: "rgb(58, 61, 231)" },
    { name: "E-coating Azure", colorCode: "rgb(0, 0, 0)" },
    { name: "E-coating Light Pink", colorCode: "rgb(224, 31, 47)" },
    { name: "Moon", colorCode: "rgb(231, 105, 231)" },
    { name: "E-coating Lemon", colorCode: "rgb(58, 61, 231)" },
  ],
  "Eave 65": [
    { name: "투명화이트", colorCode: "rgba(255, 255, 255, 0.31)" },
    { name: "투명블랙", colorCode: "rgba(24, 19, 19, 0.75)" },
  ],
  "타이거라이트 F12": [
    { name: "투명화이트", colorCode: "rgba(255, 255, 255, 0.31)" },
    { name: "투명블랙", colorCode: "rgba(24, 19, 19, 0.75)" },
    { name: "밀키화이트", colorCode: "rgb(243, 241, 236)" },
    { name: "블랙", colorCode: "rgb(0, 0, 0)" },
    { name: "투명퍼플", colorCode: "rgba(161, 77, 172, 0.78)" },
  ],
};

const components = {
  housing: [
    { name: "gh60 플라스틱", price: 7000, image: "/images/housing/gh60.png" },
    { name: "Tofu60 redux", price: 92000, image: "/images/housing/tofu.png" },
    { name: "Eave 65", price: 45000, image: "/images/housing/eave65.png" },
    {
      name: "타이거라이트 F12",
      price: 38500,
      image: "/images/housing/tiger.png",
    },
  ],
  plate: [
    {
      name: "하보링 알루 보강판",
      price: 13850,
      image: "/images/plate/gh60_fr4_leggera.png",
    },
    {
      name: "지온 fr4 보강판",
      price: 28000,
      image: "/images/plate/gh60_fr4_leggera.png",
    },
    {
      name: "지온 알루 보강판",
      price: 30000,
      image: "/images/plate/gh60_alu_leggera.png",
    },
    { name: "fr4 보강판", price: 11400, image: "/images/plate/eave.png" },
    {
      name: "fr4 보강판 기본 포함",
      price: 0,
      image: "/images/plate/tiger.png",
    },
  ],
  stabilizer: [
    { name: "체테빌", price: 3600, image: "/images/stab/cheery.png" },
    {
      name: "체테빌 기본 포함, 스테빌 변경시, 기본스테빌은 제공되지 않습니다",
      price: 0,
      image: "/images/stab/cheery.png",
    },
    { name: "사막테빌", price: 10000, image: "/images/stab/four.png" },
    { name: "나테빌 v3", price: 18000, image: "/images/stab/knight.png" },
    { name: "타테빌", price: 18000, image: "/images/stab/type.png" },
  ],
  switch: [
    {
      name: "Lucifer HE 65개",
      price: 17550,
      image: "/images/switch/lucifer.png",
    },
    { name: "DUHUK Core 65개", price: 38000, image: "/images/switch/core.png" },
    { name: "Owlab Ti 65개", price: 39500, image: "/images/switch/ti.png" },
    { name: "RAW HE 64개", price: 40000, image: "/images/switch/raw.png" },
    {
      name: "Lucifer HE 70개",
      price: 19000,
      image: "/images/switch/lucifer.png",
    },
    { name: "DUHUK Core 70개", price: 41000, image: "/images/switch/core.png" },
    { name: "Owlab Ti 70개", price: 39000, image: "/images/switch/ti.png" },
    { name: "RAW HE 70개", price: 43600, image: "/images/switch/raw.png" },
    {
      name: "Lucifer HE 90개",
      price: 24500,
      image: "/images/switch/lucifer.png",
    },
    { name: "DUHUK Core 90개", price: 52500, image: "/images/switch/core.png" },
    { name: "Owlab Ti 90개", price: 53500, image: "/images/switch/ti.png" },
    { name: "RAW HE 90개", price: 56500, image: "/images/switch/raw.png" },
  ],
  foam: { name: "흡음재", price: 8000 },

  // 새로 추가된 pcb 부품
  pcb: [
    {
      name: "venom60he + 공임비 2만",
      price: 104000,
      image: "/images/pcb/60he.png",
    },
    {
      name: "venom65he + 공임비 2.5만",
      price: 111000,
      image: "/images/pcb/65he.png",
    },
    {
      name: "venom80he + 공임비 3만",
      price: 124000,
      image: "/images/pcb/80he.png",
    },
  ],
};

const buildPresets = {
  60: {
    budget: {
      housing: components.housing[0],
      plate: components.plate[0],
      stabilizer: components.stabilizer[0],
      switch: components.switch[0],
      pcb: components.pcb[0],
      foam: false,
    },
    premium: {
      housing: components.housing[1],
      plate: components.plate[1],
      stabilizer: components.stabilizer[3],
      switch: components.switch[3],
      pcb: components.pcb[0],
      foam: false,
    },
  },
  65: {
    budget: {
      housing: components.housing[2],
      plate: components.plate[3],
      stabilizer: components.stabilizer[0],
      switch: components.switch[4],
      pcb: components.pcb[1],
      foam: false,
    },
    premium: {
      housing: components.housing[2],
      plate: components.plate[3],
      stabilizer: components.stabilizer[3],
      switch: components.switch[7],
      pcb: components.pcb[1],
      foam: false,
    },
  },
  80: {
    budget: {
      housing: components.housing[3],
      plate: components.plate[4],
      stabilizer: components.stabilizer[1],
      switch: components.switch[8],
      pcb: components.pcb[2],
      foam: false,
    },
    premium: {
      housing: components.housing[3],
      plate: components.plate[4],
      stabilizer: components.stabilizer[3],
      switch: components.switch[11],
      pcb: components.pcb[2],
      foam: false,
    },
  },
};

const availableByLayout = {
  60: {
    housing: ["gh60 플라스틱", "Tofu60 redux"],
    plate: ["하보링 알루 보강판", "지온 fr4 보강판", "지온 알루 보강판"],
    stabilizer: ["체테빌", "사막테빌", "나테빌 v3", "타테빌"],
    switch: [
      "Lucifer HE 65개",
      "DUHUK Core 65개",
      "Owlab Ti 65개",
      "RAW HE 64개",
    ],
    pcb: ["venom60he + 공임비 2만"], // 60 배열용 PCB
  },
  65: {
    housing: ["Eave 65"],
    plate: ["fr4 보강판"],
    stabilizer: ["체테빌", "사막테빌", "나테빌 v3", "타테빌"],
    switch: [
      "Lucifer HE 70개",
      "DUHUK Core 70개",
      "Owlab Ti 70개",
      "RAW HE 70개",
    ],
    pcb: ["venom65he + 공임비 2.5만"], // 65 배열용 PCB
  },
  80: {
    housing: ["타이거라이트 F12"],
    plate: ["fr4 보강판 기본 포함"],
    stabilizer: [
      "체테빌 기본 포함, 스테빌 변경시, 기본스테빌은 제공되지 않습니다",
      "사막테빌",
      "나테빌 v3",
      "타테빌",
    ],
    switch: [
      "Lucifer HE 90개",
      "DUHUK Core 90개",
      "Owlab Ti 90개",
      "RAW HE 90개",
    ],
    pcb: ["venom80he + 공임비 3만"], // 80 배열용 PCB
  },
};

export default function KeyboardBuilder() {
  const [layout, setLayout] = useState(null);
  const [selected, setSelected] = useState({
    housing: null,
    housingColor: null,
    pcb: null, // pcb 상태 추가
    plate: null,
    stabilizer: null,
    switch: null,
    foam: false,
  });
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let sum = 0;
    Object.keys(selected).forEach((key) => {
      if (key === "foam" && selected.foam) sum += components.foam.price;
      else if (key === "housingColor") return;
      else if (selected[key]) sum += selected[key].price;
    });
    setTotal(sum);
  }, [selected]);

  const onSelectLayout = (id) => {
    setLayout(id);
    setSelected({
      housing: null,
      housingColor: null,
      pcb: null,
      plate: null,
      stabilizer: null,
      switch: null,
      foam: false,
    });
  };

  const handleSelect = (type, item) => {
    if (type === "housing") {
      setSelected((prev) => ({
        ...prev,
        housing: item,
        housingColor: null,
      }));
    } else {
      setSelected((prev) => ({
        ...prev,
        [type]: item,
      }));
    }
  };

  const handleColorSelect = (color) => {
    setSelected((prev) => ({
      ...prev,
      housingColor: color,
    }));
  };

  const handlePreset = (type) => {
    if (!layout) {
      alert("먼저 배열을 선택하세요!");
      return;
    }
    const preset = buildPresets[layout][type];
    if (preset) {
      setSelected({
        ...preset,
        housingColor: null,
      });
    }
  };

  const copyToClipboard = () => {
    const layoutName = layouts.find((l) => l.id === layout)?.name || "없음";
    const text =
      `🔧 선택된 레이아웃: ${layoutName}\n` +
      Object.entries(selected)
        .map(([key, value]) => {
          if (key === "foam")
            return selected.foam
              ? `[흡음재] 추가 / ₩${components.foam.price.toLocaleString()}`
              : null;
          if (key === "housingColor")
            return value ? `[하우징 색상] ${value.name}` : null;
          return value
            ? `[${key}] ${value.name} / ₩${value.price.toLocaleString()}`
            : null;
        })
        .filter(Boolean)
        .join("\n") +
      `\n총합: ₩${total.toLocaleString()}`;
    navigator.clipboard.writeText(text);
    alert("견적이 복사되었습니다!");
  };

  const resetSelections = () => {
    setLayout(null);
    setSelected({
      housing: null,
      housingColor: null,
      pcb: null,
      plate: null,
      stabilizer: null,
      switch: null,
      foam: false,
    });
  };
  return (
    <div className="p-4 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
      <header className="col-span-full flex justify-between items-center py-4">
        <h1 className="text-3xl font-bold">리오제작소 베놈 견적 계산기</h1>
        <a
          href="https://talk.naver.com/W5TAOC"
          target="_blank"
          className="text-green-600"
        >
          리오제작소 네이버스토어 바로가기
        </a>
        <a
          href="https://discordapp.com/users/208930835175309312"
          target="_blank"
          className="text-blue-600"
        >
          리오제작소 디스코드 바로가기
        </a>
      </header>

      <div className="col-span-full flex gap-4 mb-4">
        {layouts.map((l) => (
          <button
            key={l.id}
            onClick={() => onSelectLayout(l.id)}
            className={`border rounded-xl p-2 w-28 h-28 flex flex-col items-center justify-center transition hover:scale-105 ${
              layout === l.id ? "ring-2 ring-blue-500" : ""
            }`}
          >
            <img
              src={l.image}
              alt={l.name}
              className="w-20 h-12 object-contain"
            />
            <span className="mt-1 text-sm">{l.name}</span>
          </button>
        ))}
      </div>

      <div className="col-span-full flex gap-4 mb-4">
        <button
          onClick={() => handlePreset("budget")}
          className="border rounded px-4 py-2"
        >
          가성비 빌드
        </button>
        <button
          onClick={() => handlePreset("premium")}
          className="border rounded px-4 py-2"
        >
          프리미엄 빌드
        </button>
        <button
          onClick={resetSelections}
          className="border rounded px-4 py-2 ml-auto text-red-500"
        >
          초기화
        </button>
      </div>

      {/* 선택 가능한 부품 리스트 영역 (왼쪽) */}
      <section className="col-span-2 overflow-auto max-h-[600px] space-y-8">
        {/* Housing */}
        <section>
          <h2 className="font-semibold mb-2">하우징</h2>
          <div className="flex flex-wrap gap-3">
            {layout &&
              components.housing
                .filter((item) =>
                  availableByLayout[layout].housing.includes(item.name)
                )
                .map((item) => (
                  <div
                    key={item.name}
                    onClick={() => handleSelect("housing", item)}
                    className={`cursor-pointer border rounded-lg p-3 w-36 flex flex-col items-center ${
                      selected.housing?.name === item.name
                        ? "border-blue-400"
                        : "border-gray-300"
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-contain"
                    />
                    <div className="mt-1 text-center">{item.name}</div>
                    <div className="mt-1 text-center">
                      ₩{item.price.toLocaleString()}
                    </div>
                  </div>
                ))}
          </div>
        </section>

        {/* Housing Color */}
        {selected.housing && housingColors[selected.housing.name] && (
          <section>
            <h2 className="font-semibold mb-2">하우징 색상 선택</h2>
            <div className="flex gap-3">
              {housingColors[selected.housing.name].map((color) => (
                <button
                  key={color.name}
                  onClick={() => handleColorSelect(color)}
                  className={`w-10 h-10 rounded-full border-2 ${
                    selected.housingColor?.name === color.name
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color.colorCode }}
                  title={color.name}
                />
              ))}
            </div>
          </section>
        )}

        {/* PCB - 새로 추가된 섹션 */}
        <section>
          <h2 className="font-semibold mb-2">PCB</h2>
          <div className="flex flex-wrap gap-3">
            {layout &&
              components.pcb
                .filter((item) =>
                  availableByLayout[layout].pcb.includes(item.name)
                )
                .map((item) => (
                  <div
                    key={item.name}
                    onClick={() => handleSelect("pcb", item)}
                    className={`cursor-pointer border rounded-lg p-3 w-36 flex flex-col items-center ${
                      selected.pcb?.name === item.name
                        ? "border-blue-400"
                        : "border-gray-300"
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-contain"
                    />
                    <div className="mt-1 text-center">{item.name}</div>
                    <div className="mt-1 text-center">
                      ₩{item.price.toLocaleString()}
                    </div>
                  </div>
                ))}
          </div>
        </section>

        {/* Plate */}
        <section>
          <h2 className="font-semibold mb-2">보강판</h2>
          <div className="flex flex-wrap gap-3">
            {layout &&
              components.plate
                .filter((item) =>
                  availableByLayout[layout].plate.includes(item.name)
                )
                .map((item) => (
                  <div
                    key={item.name}
                    onClick={() => handleSelect("plate", item)}
                    className={`cursor-pointer border rounded-lg p-3 w-36 flex flex-col items-center ${
                      selected.plate?.name === item.name
                        ? "border-blue-400"
                        : "border-gray-300"
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-contain"
                    />
                    <div className="mt-1 text-center">{item.name}</div>
                    <div className="mt-1 text-center">
                      ₩{item.price.toLocaleString()}
                    </div>
                  </div>
                ))}
          </div>
        </section>

        {/* Stabilizer */}
        <section>
          <h2 className="font-semibold mb-2">스테빌라이저</h2>
          <div className="flex flex-wrap gap-3">
            {layout &&
              components.stabilizer
                .filter((item) =>
                  availableByLayout[layout].stabilizer.includes(item.name)
                )
                .map((item) => (
                  <div
                    key={item.name}
                    onClick={() => handleSelect("stabilizer", item)}
                    className={`cursor-pointer border rounded-lg p-3 w-36 flex flex-col items-center ${
                      selected.stabilizer?.name === item.name
                        ? "border-blue-400"
                        : "border-gray-300"
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-contain"
                    />
                    <div className="mt-1 text-center">{item.name}</div>
                    <div className="mt-1 text-center">
                      ₩{item.price.toLocaleString()}
                    </div>
                  </div>
                ))}
          </div>
        </section>

        {/* Switch */}
        <section>
          <h2 className="font-semibold mb-2">스위치</h2>
          <div className="flex flex-wrap gap-3">
            {layout &&
              components.switch
                .filter((item) =>
                  availableByLayout[layout].switch.includes(item.name)
                )
                .map((item) => (
                  <div
                    key={item.name}
                    onClick={() => handleSelect("switch", item)}
                    className={`cursor-pointer border rounded-lg p-3 w-36 flex flex-col items-center ${
                      selected.switch?.name === item.name
                        ? "border-blue-400"
                        : "border-gray-300"
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-contain"
                    />
                    <div className="mt-1 text-center">{item.name}</div>
                    <div className="mt-1 text-center">
                      ₩{item.price.toLocaleString()}
                    </div>
                  </div>
                ))}
          </div>
        </section>

        {/* Foam */}
        <section>
          <h2 className="font-semibold mb-2">흡음재</h2>
          <label className="inline-flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selected.foam}
              onChange={() =>
                setSelected((prev) => ({ ...prev, foam: !prev.foam }))
              }
              className="form-checkbox"
            />
            <span>
              {components.foam.name} (₩{components.foam.price.toLocaleString()})
            </span>
          </label>
        </section>
      </section>

      {/* 우측 미리보기 및 요약 영역 */}
      <section className="bg-gray-100 rounded p-4 max-h-[600px] overflow-auto">
        <h2 className="text-lg font-bold mb-4">선택된 부품 미리보기</h2>

        {/* Layout */}
        {layout && (
          <div className="mb-4 flex items-center gap-3">
            <img
              src={layouts.find((l) => l.id === layout).image}
              alt={layouts.find((l) => l.id === layout).name}
              className="w-20 h-12 object-contain"
            />
            <div>{layouts.find((l) => l.id === layout).name}</div>
          </div>
        )}

        {/* Housing + Color */}
        {selected.housing && (
          <div className="mb-4 flex items-center gap-3">
            <img
              src={selected.housing.image}
              alt={selected.housing.name}
              className="w-20 h-20 object-contain"
            />
            <div>
              <div>{selected.housing.name}</div>
              {selected.housingColor && (
                <div className="mt-1 text-sm text-gray-600">
                  색상: {selected.housingColor.name}{" "}
                  <span
                    style={{
                      backgroundColor: selected.housingColor.colorCode,
                      display: "inline-block",
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      marginLeft: "6px",
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* PCB - 새로 추가된 부분 */}
        {selected.pcb && (
          <div className="mb-4 flex items-center gap-3">
            <img
              src={selected.pcb.image}
              alt={selected.pcb.name}
              className="w-16 h-16 object-contain"
            />
            <div>{selected.pcb.name}</div>
          </div>
        )}

        {/* Plate */}
        {selected.plate && (
          <div className="mb-4 flex items-center gap-3">
            <img
              src={selected.plate.image}
              alt={selected.plate.name}
              className="w-16 h-16 object-contain"
            />
            <div>{selected.plate.name}</div>
          </div>
        )}

        {/* Stabilizer */}
        {selected.stabilizer && (
          <div className="mb-4 flex items-center gap-3">
            <img
              src={selected.stabilizer.image}
              alt={selected.stabilizer.name}
              className="w-16 h-16 object-contain"
            />
            <div>{selected.stabilizer.name}</div>
          </div>
        )}

        {/* Switch */}
        {selected.switch && (
          <div className="mb-4 flex items-center gap-3">
            <img
              src={selected.switch.image}
              alt={selected.switch.name}
              className="w-16 h-16 object-contain"
            />
            <div>{selected.switch.name}</div>
          </div>
        )}

        {/* Foam */}
        {selected.foam && (
          <div className="mb-4 flex items-center gap-3">
            <div className="w-16 h-16 flex items-center justify-center bg-gray-300 rounded">
              흡음재
            </div>
            <div>{components.foam.name}</div>
          </div>
        )}

        <hr className="my-4" />

        <div className="text-xl font-semibold">
          총합: ₩{total.toLocaleString()}
        </div>

        <button
          onClick={copyToClipboard}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          견적 복사하기
        </button>
      </section>
    </div>
  );
}
