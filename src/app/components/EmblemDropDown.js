"use client";
import { useEffect, useState } from "react";

export default function Home({value, onChange}) {
  const [emblemNames, setEmblemNames] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/engage/emblem_ring_obtained");
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await res.json();
        setEmblemNames(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <select name="emblems" 
      id="emblems-dropdown"
      value={value}
      onChange={(e) => onChange(e.target.value)}>
        <option value="">Select an Emblem</option>
        {emblemNames.map((rate) => (
          <option key={rate._id} value={rate.Name}>
            {rate.Name}
          </option>
        ))}
      </select>
    </div>
  );
}