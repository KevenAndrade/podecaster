//Maneras de get dados

//1Ro - SPA single pages aplication - pode ser usado na next ou na react

  /* import {useEffect} from 'react';
  useEffect(() => {
    fetch('http://localhost:3333/episodes')
    .then((response) => response.json())
    .then(data => console.log(data))
  },[]) */

//2DO - SSR server side render - keli eh especifico pa NEXT pa resolve problema de indexason de dados ki react ta apresentab

/* export async function getServerSideProps(){
  const response = await fetch('http://localhost:3333/episodes');
  const data = await response.json();

  return {
    props: {
      episodes: data,
    }
  }
} */

//3RO - SSG static site generation - keli eh especifico pa NEXT pa resolve problema de ca tem k ta fz um chamada API sempre ki alguen 
// abri pagina, basicamente eh ta fz 1 chamada a api 3 bes por dia. 1 alguen ta reload pagina ta carega dados de api, e kes otus alguen
// ta atxa dados td caregado, midjorando performance

import { GetStaticProps } from 'next';
import Image from 'next/image';
import {format, parseISO } from 'date-fns';

import {api} from '../services/api';
import ptBR from 'date-fns/locale/pt-BR';

import styles from './home.module.scss'
import { convertDurationToTimeString } from '../utilis/convertDurationToTimeString';

type Episode = {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  duration: number;
  durationAsString: string;
  url: string;
  members: string;
  publishedAt: string;
}

type HomeProps = {
  latestEpisodes: Array<Episode>,
  allEpisodes: Array<Episode>
}

export default function Home({ latestEpisodes, allEpisodes } : HomeProps) {

  return (
    <div className={styles.homePage}>
      <section className={styles.latestEpisodes}>
      <h2>Ultimos Episodios</h2>

      <ul>
        {latestEpisodes.map(episode => {
          return (
            <li key={episode.id}>
              <Image width={128} height={128} objectFit="cover" src={episode.thumbnail} alt={episode.title}/>
              
              <div className={styles.epsisodeDetail}>
                <a href="">{episode.title}</a>
                <p>{episode.members}</p>
                <span>{episode.publishedAt}</span>
                <span>{episode.durationAsString}</span>
              </div>

              <button type="button"> 
                <img src="/play-green.svg" alt="play"/>
              </button>
            </li>
          )
        })}

      </ul>
      </section>

      <section className={styles.allEpisodes}>
        <h2>Todos Episodios</h2>

        <table cellSpacing={0}>
          <thead>
            <th></th>
            <th>Podcast</th>
            <th>Integrantes</th>
            <th>Data</th>
            <th>Duracao</th>
            <th></th>
          </thead>
          <tbody>
            {allEpisodes.map(episode =>{
              return (
                <tr key={episode.id}>
                  <td> <Image width={120} height={120} objectFit="cover" src={episode.thumbnail} alt={episode.title}/> </td>
                  <td> <a href="">{episode.title}</a> </td>
                  <td style={{ width:100 }}> {episode.members} </td>
                  <td> {episode.publishedAt} </td>
                  <td> {episode.durationAsString} </td>
                  <td> 
                    <button type="button">
                      <img src="/play-green.svg" alt="play"/>  
                    </button>  
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

      </section>
      
    </div>
  )
}

export  const getStaticProps: GetStaticProps = async () => {
  const {data} = await api.get('episodes',{
    params: {
      _limit:12,
      _sort:'published_at',
      _order:'desc'
    }
  });
  
  const episodes =  data.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', { locale: ptBR }),
      desc: episode.description,
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
      url: episode.file.url
    }
  })

  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length);

  return {
    props: {
      latestEpisodes,
      allEpisodes
    },
    revalidate: 60 * 60 * 8,
  }
}
