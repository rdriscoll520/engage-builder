"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [unitGrowthRates, setUnitGrowthRates] = useState([]);
  const [sorted, setSorted] = useState(false);
  const [originalData, setOriginalData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/engage/unit_growth_rates");
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await res.json();

        // Calculate the total for each unit and add it to the data
        const dataWithTotals = data.map((rate) => ({
          ...rate,
          Total:
            rate.HP +
            rate.Str +
            rate.Dex +
            rate.Spd +
            rate.Def +
            rate.Res +
            rate.Lck +
            rate.Bld,
        }));

        setOriginalData(dataWithTotals); // Store the original unsorted data
        setUnitGrowthRates(dataWithTotals); // Set the data initially
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  // Function to sort data
  const sortData = () => {
    const sortedData = [...unitGrowthRates].sort((a, b) => b.Total - a.Total);
    setUnitGrowthRates(sortedData);
    setSorted(true);
  };

  // Function to unsort data
  const unsortData = () => {
    setUnitGrowthRates(originalData);
    setSorted(false);
  };

  return (
    <div className="p-5">
      <h1>Unit Growth Rates</h1>
      <div className="mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          onClick={sortData}
          disabled={sorted}
        >
          Sort by Total
        </button>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded"
          onClick={unsortData}
          disabled={!sorted}
        >
          Unsort
        </button>
      </div>
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
            <th className="px-4 py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {unitGrowthRates.map((rate) => (
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
              <td className="px-4 py-2">{rate.Total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
