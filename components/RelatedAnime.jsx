"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function RelatedAnime({ animeId }) {
  const [relatedAnime, setRelatedAnime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRelatedAnime = async () => {
      try {
        const res = await fetch(
          `https://shikimori.one/api/animes/${animeId}/related`
        );
        if (!res.ok) throw new Error("Failed to fetch related anime");
        const data = await res.json();
        setRelatedAnime(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (animeId) {
      fetchRelatedAnime();
    }
  }, [animeId]);

  const getImageUrl = (path) => {
    const baseUrl = "https://shikimori.one";
    if (!path) return "/placeholder.svg";
    return path.startsWith("/assets") || path.startsWith("/system")
      ? `${baseUrl}${path}`
      : path;
  };

  if (loading) {
    return <p className="text-gray-400">Loading related anime...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  if (!relatedAnime || relatedAnime.length === 0) {
    return <p className="text-gray-400">No related anime found.</p>;
  }

  return (
    <section className="mt-12">
      <h2 className="text-3xl font-bold mb-6">Related Anime</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {relatedAnime
          .filter((item) => item.anime) // Ensure item.anime exists
          .map((item) => (
            <motion.div
              key={item.anime.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
            >
              <Link href={`/anime/${item.anime.id}`}>
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <Image
                    src={getImageUrl(item.anime.image?.original)}
                    alt={item.anime.name || "Unknown Anime"}
                    width={200}
                    height={300}
                    className="w-full object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold truncate">
                      {item.anime.name || "Unknown Title"}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {item.relation || "Unknown Relation"}
                    </p>
                    <p className="text-sm text-yellow-400">
                      Score: {item.anime.score ?? "N/A"}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
      </div>
    </section>
  );
}
