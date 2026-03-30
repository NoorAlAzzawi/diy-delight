import {
  exteriorOptions,
  roofOptions,
  wheelOptions,
  interiorOptions,
  basePrice,
  convertiblePrice,
} from "../data/options";

const getOptionPrice = (options, selectedName) => {
  const found = options.find((option) => option.name === selectedName);
  return found ? found.price : 0;
};

export const calculateCarPrice = ({
  exterior,
  roof,
  wheels,
  interior,
  convertible,
}) => {
  return (
    basePrice +
    getOptionPrice(exteriorOptions, exterior) +
    getOptionPrice(roofOptions, roof) +
    getOptionPrice(wheelOptions, wheels) +
    getOptionPrice(interiorOptions, interior) +
    (convertible ? convertiblePrice : 0)
  );
};
