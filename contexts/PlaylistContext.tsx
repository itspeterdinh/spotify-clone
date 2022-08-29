import { useSession } from "next-auth/react";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import useSpotify from "../hooks/useSpotify";
import { IPlaylistContext, PlayListContextState } from "../types";

const defaultPlaylistContextState: PlayListContextState = {
  playlists: [],
  selectedPlaylistId: null,
  selectedPlaylist: null,
};

export const PlaylistContext = createContext<IPlaylistContext>({
  playlistContextState: defaultPlaylistContextState,
  updatePlaylistContextState: () => {},
});

export const usePlaylistContext = () => useContext(PlaylistContext);

const PlaylistContextProvider = ({ children }: { children: ReactNode }) => {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [playlistContextState, setPlayListContextState] = useState(
    defaultPlaylistContextState
  );

  const updatePlaylistContextState = (
    updateObj: Partial<PlayListContextState>
  ) => {
    setPlayListContextState((prev) => ({
      ...prev,
      ...updateObj,
    }));
  };

  useEffect(() => {
    const getUserPlaylists = async () => {
      const userPlaylistResponse = await spotifyApi.getUserPlaylists();
      updatePlaylistContextState({
        playlists: userPlaylistResponse.body.items,
      });
    };

    if (spotifyApi.getAccessToken()) {
      getUserPlaylists();
    }
  }, [session, spotifyApi]);

  const playlistContextProviderData = {
    playlistContextState,
    updatePlaylistContextState,
  };

  return (
    <PlaylistContext.Provider value={playlistContextProviderData}>
      {children}
    </PlaylistContext.Provider>
  );
};

export default PlaylistContextProvider;
