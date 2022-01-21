import '../styles/global.scss';
import {Header} from '../components/Header';
import {Player} from '../components/Player';
import style from '../styles/app.module.scss'; 
import { playerContext } from '../context/playerContext';
import { useState } from 'react';


function MyApp({ Component, pageProps }) {
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

  return (
  <playerContext.Provider value=
    {{ 
      episodeList: episodeList,
      currentEpisodeIndex: currentEpisodeIndex, 
      play, 
      isPlaying,
      togglePlay }
      }>
      <div className={style.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </playerContext.Provider>
  )
    
}

export default MyApp
