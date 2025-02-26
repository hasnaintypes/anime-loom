"use client";

import { useEffect, useState } from "react";
import { CalendarIcon, Loader2 } from "lucide-react";
// import AnimeCard from "@/components/anime-card";
import CalendarAnimeCard from "./_components/anime-card";
import Header from "@/components/Header";
import Loader from "@/components/Loader";

export default function CalendarPage() {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await fetch("https://shikimori.one/api/calendar");
        if (!response.ok) throw new Error("Failed to fetch schedule");
        const data = await response.json();
        setSchedule(data);
      } catch (err) {
        setError("Failed to load the anime schedule. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] p-4">
        <p className="text-red-400 text-center">{error}</p>
      </div>
    );
  }

  // Group anime by date
  const groupedSchedule = schedule.reduce((acc, entry) => {
    const date = new Date(entry.next_episode_at).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });

    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(entry);
    return acc;
  }, {});

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <CalendarIcon className="w-8 h-8 text-yellow-400" />
          <h1 className="text-3xl font-bold text-white">Anime Calendar</h1>
        </div>

        <div className="space-y-8">
          {Object.entries(groupedSchedule).map(([date, entries]) => (
            <div key={date} className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-300 border-b border-gray-700 pb-2">
                {date}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {entries.map((entry) => (
                  <CalendarAnimeCard
                    key={`${entry.anime.id}-${entry.next_episode}`}
                    entry={entry}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
