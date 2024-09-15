"use client";
import { useEffect, useState } from "react";

export default function Home({value, onChange}) {
  const [classNames, setClassNames] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/engage/class_growth_rates");
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await res.json();
        setClassNames(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <select name="classes" 
      id="classes-dropdown"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select a Class</option>
        {classNames.map((rate) => (
          <option key={rate._id} value={rate.Name}>
            {rate.Name}
          </option>
        ))}
      </select>
    </div>
  );
}