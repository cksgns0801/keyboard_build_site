export const housingColors = [
  { id: 1, name: "블랙", colorCode: "#000000" },
  { id: 2, name: "화이트", colorCode: "#FFFFFF" },
  { id: 3, name: "레드", colorCode: "#FF0000" },
  { id: 4, name: "블루", colorCode: "#0000FF" },
];

export const components = {
  housing: [
    {
      name: "알루미늄 하우징",
      image: "/images/housing1.png",
      price: 40000,
      compatiblePlates: ["폴리카보네이트 보강판", "스틸 보강판"],
    },
    {
      name: "아크릴 하우징",
      image: "/images/housing2.png",
      price: 25000,
      compatiblePlates: ["스틸 보강판"],
    },
  ],
  plate: [
    {
      name: "폴리카보네이트 보강판",
      image: "/images/plate1.png",
      price: 12000,
    },
    {
      name: "스틸 보강판",
      image: "/images/plate2.png",
      price: 15000,
    },
  ],
  stabilizer: [
    {
      name: "듀록 V2",
      image: "/images/stab1.png",
      price: 28000,
    },
    {
      name: "TX 스테빌",
      image: "/images/stab2.png",
      price: 32000,
    },
  ],
  switch: [
    {
      name: "게이트론 옐로우",
      image: "/images/switch1.png",
      price: 25000,
    },
    {
      name: "체리 적축",
      image: "/images/switch2.png",
      price: 35000,
    },
  ],
  foam: {
    name: "흡음재",
    price: 8000,
  },
};
