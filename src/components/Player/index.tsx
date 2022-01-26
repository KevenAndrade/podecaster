import { useContext, useRef, useEffect } from 'react';
import Image from 'next/Image';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { playerContext } from '../../context/playerContext';
import styles from './styles.module.scss';

export function Player(){
    const { episodeList, currentEpisodeIndex, isPlaying, togglePlay, setPlayingState,  playNext, playPreviows, hasNext, hasPrevious } = useContext(playerContext);
    const audioRef = useRef<HTMLAudioElement>(null);
    const episode = episodeList[currentEpisodeIndex];

    useEffect(()=>{
        if(!audioRef.current){
            return;
        }
        if (isPlaying) {
            audioRef.current.play();
        }else{
            audioRef.current.pause();
        }      
    }, [isPlaying])

    return (
        <div className={styles.playerContainer}>
            <header>
                <img src="/playing.svg" alt="Tocando"/>
                <strong>Tocando agora </strong>
            </header>

            { episode ? (
                <div className={styles.currentEpisode}>
                    <Image width = {592} height = {592} src={episode.thumbnail} alt={episode.title} objectFit="cover"/>
                    <strong>{episode.title}</strong>
                    <span>{episode.members}</span>
                </div>
            ) : (
                <div className={styles.emptyplayer}>
                    <strong>Selecione um podcast para ouvir</strong>
                </div>
            )}

            <footer className={!episode ? styles.empty : ''}>
                <div className={styles.progressbar}>
                    <span>00:00</span>
                    <div className={styles.slider}>
                        { episode ? (
                            <Slider 
                                trackStyle={{ backgroundColor: '#04d361'}}
                                railStyle={{ backgroundColor: '#9f75ff'}}
                                handleStyle={{ borderColor: '#04d361', borderWidth: 4}}
                            />
                        ) : (
                            <div className={styles.emptySlider}/>
                        )}
                        
                    </div>
                    <span>00:00</span>
                </div>
                
                { episode && (
                    <audio 
                        src={episode.url} 
                        ref={audioRef}
                        autoPlay
                        onPlay={() => setPlayingState(true)}
                        onPause={() => setPlayingState(false)}
                    />
                )}

                <div className={styles.buttons}>
                    <button type="button" disabled={!episode}>
                        <img src="/shuffle.svg" alt="Random"/>
                    </button>
                    <button type="button" disabled={!episode || !hasPrevious} onClick={() =>playPreviows()}>
                        <img src="/play-previous.svg" alt="previous"/>
                    </button>
                    <button type="button" className={styles.PlayButton} disabled={!episode} onClick={() =>togglePlay()}>
                        {isPlaying ? (
                            <img src="/pause.svg" alt="play"/>
                        ) : (
                            <img src="/play.svg"  alt="play"/>
                        )}
                    </button>
                    <button type="button" disabled={!episode || !hasNext} onClick={() =>playNext()}>
                        <img src="/play-next.svg" alt="next"/>
                    </button>
                    <button type="button" disabled={!episode}>
                        <img src="/repeat.svg" alt="play"/>
                    </button>
                </div>
            </footer>
        </div>
    );
}