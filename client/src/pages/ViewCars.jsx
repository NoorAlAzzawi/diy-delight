import { useEffect, useState } from "react";
import { getAllCars } from "../services/carsApi";

export default function ViewCars() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    const data = await getAllCars();
    setCars(data);
  };

  return (
    <div style={styles.container}>
      <h1>🚗 All Cars</h1>

      {cars.length === 0 && <p>No cars yet</p>}

      {cars.map((car) => (
        <div key={car.id} style={styles.card}>
          <h3>{car.name}</h3>
          <p>Exterior: {car.exterior}</p>
          <p>Interior: {car.interior}</p>
          <p>Wheels: {car.wheels}</p>
          <p>Roof: {car.roof}</p>
          <p>Convertible: {car.convertible ? "Yes" : "No"}</p>
          <h4>${car.price}</h4>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 800,
    margin: "40px auto",
  },
  card: {
    border: "1px solid #ccc",
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
  },
};
