import { JWT } from "next-auth/jwt";
import { Session, User } from "next-auth";

export enum TokenError {
  RefreshAccessTokenError = "RefreshAccessTokenError",
}

export interface ExtendedToken extends JWT {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: number;
  user: User;
  error?: TokenError;
}

export interface ExtendedSession extends Session {
  accessToken: ExtendedToken["accessToken"];
  error: ExtendedToken["error"];
}

export interface PlayListContextState {
  playlists: SpotifyApi.PlaylistObjectSimplified[];
  selectedPlaylistId: string | null;
  selectedPlaylist: SpotifyApi.SinglePlaylistResponse | null;
}

export interface IPlaylistContext {
  playlistContextState: PlayListContextState;
  updatePlaylistContextState: (
    updateObj: Partial<PlayListContextState>
  ) => void;
}
