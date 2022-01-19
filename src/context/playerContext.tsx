import { createContext }  from 'react';

type Episode = {
    title: string;
    thumbnail: string;
    duration: number;
    url: string;
    members: string;
}

type playerContextData = {
    episodeList: Array<Episode>;
    currentEpisodeIndex: number;
    play: (episode: Episode) => void;
}

export const playerContext = createContext({} as playerContextData);