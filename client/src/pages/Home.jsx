import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCar } from "../services/carsApi";
import { calculateCarPrice } from "../utils/priceUtils";
import { validateCar } from "../utils/validation";
import {
  exteriorOptions,
  roofOptions,
  wheelOptions,
  interiorOptions,
} from "../data/options";

export default function Home() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    exterior: "Arctic White",
    roof: "Body Color",
    wheels: "Standard Silver",
    interior: "Jet Black",
    convertible: false,
  });

  const [error, setError] = useState("");

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    const validationError = validateCar(form);

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const price = calculateCarPrice(form);

      await createCar({
        ...form,
        price,
      });

      navigate("/cars");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🚗 Build Your Dream Car</h1>

      <input
        placeholder="Car Name"
        value={form.name}
        onChange={(e) => handleChange("name", e.target.value)}
        style={styles.input}
      />

      <Select
        label="Exterior"
        options={exteriorOptions}
        value={form.exterior}
        onChange={(v) => handleChange("exterior", v)}
      />
      <Select
        label="Roof"
        options={roofOptions}
        value={form.roof}
        onChange={(v) => handleChange("roof", v)}
      />
      <Select
        label="Wheels"
        options={wheelOptions}
        value={form.wheels}
        onChange={(v) => handleChange("wheels", v)}
      />
      <Select
        label="Interior"
        options={interiorOptions}
        value={form.interior}
        onChange={(v) => handleChange("interior", v)}
      />

      <label style={styles.checkbox}>
        <input
          type="checkbox"
          checked={form.convertible}
          onChange={(e) => handleChange("convertible", e.target.checked)}
        />
        Convertible (+$10,000)
      </label>

      <h2 style={styles.price}>${calculateCarPrice(form).toLocaleString()}</h2>

      {error && <p style={styles.error}>{error}</p>}

      <button onClick={handleSubmit} style={styles.button}>
        Create Car
      </button>
    </div>
  );
}

function Select({ label, options, value, onChange }) {
  return (
    <div style={{ marginBottom: 15 }}>
      <label>{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={styles.select}
      >
        {options.map((opt) => (
          <option key={opt.name} value={opt.name}>
            {opt.name} (+${opt.price})
          </option>
        ))}
      </select>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 500,
    margin: "50px auto",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  title: {
    textAlign: "center",
  },
  input: {
    padding: 10,
    fontSize: 16,
  },
  select: {
    padding: 10,
    width: "100%",
  },
  checkbox: {
    marginTop: 10,
  },
  button: {
    padding: 12,
    background: "#6366f1",
    color: "white",
    border: "none",
    cursor: "pointer",
    marginTop: 10,
  },
  price: {
    textAlign: "center",
  },
  error: {
    color: "red",
    textAlign: "center",
  },
};
