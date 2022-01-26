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
    toggleLoop: () => void;
    isLoop: boolean;
    isShuffle: boolean;
    toggleShuffle: () => void;
}

export const playerContext = createContext({} as playerContextData);

export function PlayerContextProvider( { children }) {
    const [ episodeList, setEpisodeList] = useState([]);
    const [ currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [ isPlaying, setIsPlaying] = useState(false);
    const [ isLoop, setIsLoop] = useState(false);
    const [ isShuffle, setIsShuffle] = useState(false);

    const hasNext = (currentEpisodeIndex + 1) < episodeList.length;
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

    function toggleLoop(){
        setIsLoop(!isLoop);
    }

    function toggleShuffle(){
        setIsShuffle(!isShuffle);
    }

    function setPlayingState(state : boolean){
        setIsPlaying(state);
    }

    function playNext(){
        if(isShuffle){
            const nextRandomIndex = Math.floor(Math.random() * episodeList.length);
            setCurrentEpisodeIndex(nextRandomIndex);
        } else if(hasNext){
            setCurrentEpisodeIndex(currentEpisodeIndex + 1);
        }
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
                playNext, playPreviows, hasNext, hasPrevious, toggleLoop, isLoop,
                isShuffle, toggleShuffle
            }}
        >
            { children }
        </playerContext.Provider>
    )
}