"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Card from "../components/Card";

export default function Home() {
  const [names, setNames] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/engage/unit_growth_rates");
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

  return (
    <div className="grid gap-4 grid-cols-3 auto-rows-fr">
      {names.map((rate) => (
        <Link key={rate._id} href={`/units/${rate.Name}`} passHref>
          <Card className="flex items-center justify-center h-full min-h-[200px]">
            <div className="flex justify-center">
              <h1 className="px-4 py-2">{rate.Name}</h1>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
