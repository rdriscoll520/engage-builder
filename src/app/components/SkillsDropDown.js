"use client";
import { useEffect, useState } from "react";

export default function Home({ names, value, onChange, label }) {  // Destructure props for two values and onChange handlers
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/engage/skills");
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await res.json();
        setSkills(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <select name = "skills" 
      id="skills-dropdown"
      value={value}
      onChange={(e) => onChange(e.target.value)}>
        <option value="">Select a Skill</option>
        {skills.map((name) => (
          <option key={name._id} value={name.Name}>
            {name.Name}
          </option>
        ))}
      </select>
    </div>
  );
}
