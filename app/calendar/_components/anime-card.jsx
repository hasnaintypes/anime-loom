"use client";

export default function CalendarAnimeCard({ entry }) {
  const { anime, next_episode, next_episode_at } = entry;

  // Format the next episode date
  const nextEpisodeDate = new Date(next_episode_at).toLocaleString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "ongoing":
        return "bg-green-500/20 text-green-400";
      case "anons":
        return "bg-blue-500/20 text-blue-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  // Get kind badge (TV, Movie, etc.)
  const getKindBadge = (kind) => {
    return kind.toUpperCase();
  };

  return (
    <div className="bg-gray-800/50 rounded-lg overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-300 border border-gray-700 hover:border-yellow-400/50 group">
      <div className="relative aspect-video bg-gray-900">
        <img
          src={`https://shikimori.one${anime.image.original}`}
          alt={anime.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg?height=200&width=300";
          }}
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
              anime.status
            )}`}
          >
            {anime.status.toUpperCase()}
          </span>
          <span className="bg-gray-700/90 text-gray-300 px-2 py-1 rounded text-xs font-medium">
            {getKindBadge(anime.kind)}
          </span>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h3 className="text-lg font-semibold text-white group-hover:text-yellow-400 transition-colors line-clamp-1">
            {anime.name}
          </h3>
          {anime.russian && (
            <p className="text-sm text-gray-400 line-clamp-1">
              {anime.russian}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Next Episode</span>
            <span className="font-medium text-yellow-400">
              EP {next_episode}
            </span>
          </div>

          <div className="text-xs text-gray-500">{nextEpisodeDate}</div>

          <div className="flex items-center justify-between pt-2 border-t border-gray-700/50">
            {anime.episodes > 0 ? (
              <span className="text-sm text-gray-400">
                Episodes: {anime.episodes_aired}/{anime.episodes}
              </span>
            ) : (
              <span className="text-sm text-gray-400">Episodes: TBA</span>
            )}
            {anime.score && anime.score !== "0.0" && (
              <span className="bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded text-sm">
                ★ {anime.score}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
