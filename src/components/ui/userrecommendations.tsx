import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Container } from "@/components/ui/container.tsx";

interface TopTrack {
  id: string;
  name: string;
  album: {
    album_type: string;
    id: string;
    name: string;
    images: { url: string }[];
  };
}

const UserRecommendations: React.FC<{ trackIds: TopTrack[], accessToken: string }> = ({ trackIds, accessToken }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [userRecommendations, setUserRecommendations] = useState<TopTrack[]>();

  useEffect(() => {
   
      const firstFiveTrackIds = trackIds.slice(0, 5);
      const seedTracksParam = firstFiveTrackIds.map(track => track.id).join(',').toString();

      const getRecommendations = async () => {
        try {
          const response = await fetch(
            `https://api.spotify.com/v1/recommendations?limit=20&seed_tracks=${seedTracksParam}`, 
            {
              method: "GET",
              headers: {
                Authorization: "Bearer " + accessToken,
              },
            }
          );
          if (response.ok) {
            const reccData = await response.json();
            setUserRecommendations(reccData.tracks);
            localStorage.setItem("userRec", JSON.stringify(reccData.tracks)); // Store recommendations in localStorage
          } else {
            console.error(
              `Error fetching track info. Status code: ${response.status}`
            );
          }
        } catch (error) {
          console.error("Error fetching recommended tracks:", error);
        } finally {
          setLoading(false);
        }
      };
    
      getRecommendations();
   
  }, [trackIds]);

  useEffect(() => {
    const storedRecommendations = localStorage.getItem('userRec');
    if (storedRecommendations) {
      setUserRecommendations(JSON.parse(storedRecommendations));
    }
  }, []);

  return (
    <div className="mt-8">
      <Container>
        <div className="mt-8 text-left">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Recommended Tracks
          </h3>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <Carousel className="w-full max-w-l mt-3 mb-3">
              <CarouselContent>
                {userRecommendations && userRecommendations.map((track) => (
                  <CarouselItem
                    key={track.id}
                    className="md:basis-1/3 lg:basis-1/4 carousel-item"
                  >
                    {track.album.album_type === "ALBUM" ? (
                      <Link to={`/album/${track.album.id}`}>
                        {track.album?.images[1]?.url && (
                        <img
                            src={track.album.images[1].url}
                            alt={track.name}
                            className="hover:border-primary border-transparent border-2"
                          />
                        )}
                      </Link>
                    ) : (
                      <img src={track.album.images[1].url} alt={track.name} />
                    )}
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          )}
        </div>
      </Container>
    </div>
  );
};

export default UserRecommendations;
