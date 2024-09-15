"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [unitGrowthRates, setUnitGrowthRates] = useState([]);
  const [activeSortKeys, setActiveSortKeys] = useState([]);

  // Move fetchData outside of useEffect so it can be reused
  const fetchData = async () => {
    try {
      const res = await fetch("/api/engage/unit_growth_rates");
      if (!res.ok) {
        throw new Error("Failed to fetch");
      }
      const data = await res.json();

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

      setUnitGrowthRates(dataWithTotals);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCheckboxChange = (key) => {
    const updatedSortKeys = activeSortKeys.includes(key)
      ? activeSortKeys.filter((k) => k !== key)
      : [...activeSortKeys, key];
  
    setActiveSortKeys(updatedSortKeys);
  
    if (updatedSortKeys.length === 0) {
      unsortData();  // Call unsortData if no checkboxes are selected
    } else {
      sortData(updatedSortKeys);
    }
  };

  const sortData = (keys) => {
    if (keys.length === 0) {
      setUnitGrowthRates((prevData) => [...prevData]); // No sort applied
      return;
    }

    const sortedData = [...unitGrowthRates].sort((a, b) => {
      const totalA = keys.reduce((sum, key) => sum + a[key], 0);
      const totalB = keys.reduce((sum, key) => sum + b[key], 0);
      return totalB - totalA;
    });

    setUnitGrowthRates(sortedData);
  };

  const unsortData = () => {
    setActiveSortKeys([]);
    fetchData(); // Refetch to reset the original order
  };

  return (
    <div className="p-5">
      <h1>Unit Growth Rates</h1>
      <table>
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">
              <input
                type="checkbox"
                checked={activeSortKeys.includes("HP")}
                onChange={() => handleCheckboxChange("HP")}
              /> HP
            </th>
            <th className="px-4 py-2">
              <input
                type="checkbox"
                checked={activeSortKeys.includes("Str")}
                onChange={() => handleCheckboxChange("Str")}
              /> Str
            </th>
            <th className="px-4 py-2">
              <input
                type="checkbox"
                checked={activeSortKeys.includes("Mag")}
                onChange={() => handleCheckboxChange("Mag")}
              /> Mag
            </th>
            <th className="px-4 py-2">
              <input
                type="checkbox"
                checked={activeSortKeys.includes("Dex")}
                onChange={() => handleCheckboxChange("Dex")}
              /> Dex
            </th>
            <th className="px-4 py-2">
              <input
                type="checkbox"
                checked={activeSortKeys.includes("Spd")}
                onChange={() => handleCheckboxChange("Spd")}
              /> Spd
            </th>
            <th className="px-4 py-2">
              <input
                type="checkbox"
                checked={activeSortKeys.includes("Def")}
                onChange={() => handleCheckboxChange("Def")}
              /> Def
            </th>
            <th className="px-4 py-2">
              <input
                type="checkbox"
                checked={activeSortKeys.includes("Res")}
                onChange={() => handleCheckboxChange("Res")}
              /> Res
            </th>
            <th className="px-4 py-2">
              <input
                type="checkbox"
                checked={activeSortKeys.includes("Lck")}
                onChange={() => handleCheckboxChange("Lck")}
              /> Lck
            </th>
            <th className="px-4 py-2">
              <input
                type="checkbox"
                checked={activeSortKeys.includes("Bld")}
                onChange={() => handleCheckboxChange("Bld")}
              /> Bld
            </th>
            <th className="px-4 py-2">
              <input
                type="checkbox"
                checked={activeSortKeys.includes("Total")}
                onChange={() => handleCheckboxChange("Total")}
              /> Total
            </th>
            <th>Sorted Total</th>
          </tr>
        </thead>
        <tbody>
          {unitGrowthRates.map((rate) => {
            const sortedTotal = activeSortKeys.reduce(
              (sum, key) => sum + rate[key],
              0
            );

            return (
              <tr key={rate._id}>
                <td className="px-4 py-2">{rate.Name}</td>
                <td className="px-4 py-2">{rate.HP}</td>
                <td className="px-4 py-2">{rate.Str}</td>
                <td className="px-4 py-2">{rate.Mag}</td>
                <td className="px-4 py-2">{rate.Dex}</td>
                <td className="px-4 py-2">{rate.Spd}</td>
                <td className="px-4 py-2">{rate.Def}</td>
                <td className="px-4 py-2">{rate.Res}</td>
                <td className="px-4 py-2">{rate.Lck}</td>
                <td className="px-4 py-2">{rate.Bld}</td>
                <td className="px-4 py-2">{rate.Total}</td>
                <td className="px-10 py-2">{sortedTotal}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="mt-4">
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded"
          onClick={unsortData}
          disabled={activeSortKeys.length === 0}
        >
          Unsort
        </button>
      </div>
    </div>
  );
}
