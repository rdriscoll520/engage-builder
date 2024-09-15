"use client";
import { useEffect, useState } from "react";
import CharacterDropDown from "../components/CharacterDropDown";
import ClassDropDown from "../components/ClassDropDown";
import EmblemDropDown from "../components/EmblemDropDown";
import SkillsDropDown from "../components/SkillsDropDown";

export default function Home() {
  const [names, setNames] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedEmblem, setSelectedEmblem] = useState("");
  const [selectedSkill1, setSelectedSkill1] = useState("");
  const [selectedSkill2, setSelectedSkill2] = useState("");
  const [team, setTeam] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/engage/emblem_ring_obtained");
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await res.json();
        setNames(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const handleAddToTeam = () => {
    const newCharacter = {
      character: selectedCharacter,
      class: selectedClass,
      emblem: selectedEmblem,
      skills: [selectedSkill1, selectedSkill2]  // Add both selected skills
    };

    console.log("Adding character:", newCharacter); // Debugging log
    setTeam([...team, newCharacter]);

    // Optionally reset fields
    setSelectedCharacter("");
    setSelectedClass("");
    setSelectedEmblem("");
    setSelectedSkill1("");
    setSelectedSkill2("");
  };

  return (
    <div>
      <div className="character-select">
        <h1>Unit</h1>
        <CharacterDropDown names={names} value={selectedCharacter} onChange={setSelectedCharacter} />
        <h1>Class</h1>
        <ClassDropDown names={names} value={selectedClass} onChange={setSelectedClass} />
        <h1>Emblem</h1>
        <EmblemDropDown names={names} value={selectedEmblem} onChange={setSelectedEmblem} />
        <h1>Inheritable Skills</h1>
        <SkillsDropDown names={names} value={selectedSkill1} onChange={setSelectedSkill1} label="Skill 1" />
        <SkillsDropDown names={names} value={selectedSkill2} onChange={setSelectedSkill2} label="Skill 2" />
        <button onClick={handleAddToTeam}>Add To Team</button>
      </div>

      <div className="team-select">
        <h1>Team</h1>
        {team.map((member, index) => (
          <div key={index}>
            <h2>{member.character || "No Character Selected"}</h2>
            <p>Class: {member.class || "No Class Selected"}</p>
            <p>Emblem: {member.emblem || "No Emblem Selected"}</p>
            <p>Skills: {member.skills.filter(Boolean).join(", ") || "No Skills Selected"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
