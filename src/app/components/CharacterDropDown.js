"use client";
import { useEffect, useState } from "react";

export default function Home({ value, onChange }) {
  const [unitNames, setUnitNames] = useState([]); // Rename state to avoid conflict

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/engage/unit_growth_rates");
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await res.json();
        setUnitNames(data); // Update state correctly
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <select
        name="units"
        id="units-dropdown"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select a Unit</option>
        {unitNames.map((rate) => (
          <option key={rate._id} value={rate.Name}>
            {rate.Name}
          </option>
        ))}
      </select>
    </div>
  );
}
