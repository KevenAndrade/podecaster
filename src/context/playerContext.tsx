import id from 'date-fns/esm/locale/id/index.js';
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
    playNext: () => void;
    playPreviows: () => void;
    hasNext: boolean;
    hasPrevious: boolean;
}

export const playerContext = createContext({} as playerContextData);

export function PlayerContextProvider( { children }) {
    const [ episodeList, setEpisodeList] = useState([]);
    const [ currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [ isPlaying, setIsPlaying] = useState(false);

    const hasNext = (currentEpisodeIndex + 1) >= episodeList.length;
    const hasPrevious = currentEpisodeIndex > 0;

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

    function playNext(){
        if(hasNext){
            return;
        }
        setCurrentEpisodeIndex(currentEpisodeIndex + 1);
    }

    function playPreviows(){
        if(hasPrevious){
            setCurrentEpisodeIndex(currentEpisodeIndex - 1);
        }
    }

    return (
        <playerContext.Provider 
            value={{ 
                episodeList: episodeList, 
                currentEpisodeIndex: currentEpisodeIndex, 
                play, isPlaying, togglePlay, setPlayingState, playList,
                playNext, playPreviows, hasNext, hasPrevious
            }}
        >
            { children }
        </playerContext.Provider>
    )
}