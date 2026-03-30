const API_BASE = "http://localhost:3001/api/items";

export const getAllCars = async () => {
  const res = await fetch(API_BASE);
  return res.json();
};

export const createCar = async (carData) => {
  const response = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(carData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed");
  }

  return response.json();
};
