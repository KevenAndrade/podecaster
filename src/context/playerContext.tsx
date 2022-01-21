import { createContext, useState }  from 'react';

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
    isPlaying: boolean;
    play: (episode: Episode) => void;
    setPlayingState: (state: boolean) => void;
    togglePlay: () => void;
}

export const playerContext = createContext({} as playerContextData);

export function PlayerContextProvider( { children }) {
    const [ episodeList, setEpisodeList] = useState([]);
    const [ currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [ isPlaying, setIsPlaying] = useState(false);

    function play(episode){
        setEpisodeList([episode]);
        setCurrentEpisodeIndex(0);
        setIsPlaying(true);
    }

    function togglePlay(){
        setIsPlaying(!isPlaying);
    }

    function setPlayingState(state : boolean){
        setIsPlaying(state);
    }
    return (
        <playerContext.Provider value={{ episodeList: episodeList, currentEpisodeIndex: currentEpisodeIndex, play, isPlaying, togglePlay, setPlayingState }}>
            { children }
        </playerContext.Provider>
        )
}