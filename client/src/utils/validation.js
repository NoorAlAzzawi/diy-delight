export const validateCar = ({ roof, convertible, interior, exterior }) => {
  if (convertible && roof === "Carbon Flash") {
    return "Convertible cars cannot use the Carbon Flash roof.";
  }

  if (interior === "Adrenaline Red" && exterior === "Torch Red") {
    return "Adrenaline Red interior cannot be paired with Torch Red exterior.";
  }

  return "";
};
