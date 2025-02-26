"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Loader from "./Loader";

export default function AnimeCharacters({ animeId }) {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const res = await fetch(
          `https://shikimori.one/api/animes/${animeId}/roles`
        );
        const data = await res.json();
        const mainCharacters = data
          .filter((role) => role.character && role.roles.includes("Main"))
          .map((role) => ({
            ...role.character,
            role: role.roles.join(", "),
          }));
        setCharacters(mainCharacters);
      } catch (error) {
        console.error("Error fetching anime characters:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacters();
  }, [animeId]);

  if (isLoading) {
    return <Loader />;
  }

  if (characters.length === 0) {
    return <div>No character information available.</div>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Main Characters</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {characters.map((character) => (
          <div
            key={character.id}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative aspect-[3/4]">
              <Image
                src={`https://shikimori.one${character.image.original}`}
                alt={character.name}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 ease-in-out hover:scale-105"
              />
            </div>
            <div className="p-3">
              <h3 className="text-sm font-semibold truncate">
                {character.name}
              </h3>
              <p className="text-xs text-gray-400 truncate">
                {character.russian}
              </p>
              <p className="text-xs text-yellow-400 mt-1">{character.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
