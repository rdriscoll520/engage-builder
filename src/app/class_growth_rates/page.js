"use client"
import { useEffect, useState } from 'react';

export default function Home() {
  const [classGrowthRates, setClassGrowthRates] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/engage/class_growth_rates');
        if (!res.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await res.json();
        setClassGrowthRates(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className = "p-5">
      <h1>Class Growth Rates</h1>
      <table>
        <thead>
          <tr>
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">HP</th>
          <th className="px-4 py-2">Str</th>
          <th className="px-4 py-2">Dex</th>
          <th className="px-4 py-2">Spd</th>
          <th className="px-4 py-2">Def</th>
          <th className="px-4 py-2">Res</th>
          <th className="px-4 py-2">Lck</th>
          <th className="px-4 py-2">Bld</th>
          </tr>
        </thead>
        <tbody>
          {classGrowthRates.map((rate) => (
            <tr key={rate._id}>
            <td className="px-4 py-2">{rate.Name}</td>
            <td className="px-4 py-2">{rate.HP}</td>
            <td className="px-4 py-2">{rate.Str}</td>
            <td className="px-4 py-2">{rate.Dex}</td>
            <td className="px-4 py-2">{rate.Spd}</td>
            <td className="px-4 py-2">{rate.Def}</td>
            <td className="px-4 py-2">{rate.Res}</td>
            <td className="px-4 py-2">{rate.Lck}</td>
            <td className="px-4 py-2">{rate.Bld}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
