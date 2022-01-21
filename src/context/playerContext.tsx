import { createContext, useState }  from 'react';
import Episode from '../pages/episode/[nomeEp]';

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
    playList: (list: Episode[], index: number) => void;
}

export const playerContext = createContext({} as playerContextData);

export function PlayerContextProvider( { children }) {
    const [ episodeList, setEpisodeList] = useState([]);
    const [ currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [ isPlaying, setIsPlaying] = useState(false);

    function play(episode: Episode){
        setEpisodeList([episode]);
        setCurrentEpisodeIndex(0);
        setIsPlaying(true);
    }

    function playList(list: Episode[], index: number) {
        setEpisodeList(list);
        setCurrentEpisodeIndex(index);
        setIsPlaying(true);
    }

    function togglePlay(){
        setIsPlaying(!isPlaying);
    }

    function setPlayingState(state : boolean){
        setIsPlaying(state);
    }
    return (
        <playerContext.Provider 
            value={{ 
                episodeList: episodeList, 
                currentEpisodeIndex: currentEpisodeIndex, 
                play, isPlaying, togglePlay, setPlayingState, playList 
            }}
        >
            { children }
        </playerContext.Provider>
    )
}