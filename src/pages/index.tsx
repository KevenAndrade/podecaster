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
import {api} from '../services/api';

type Episode = {
  id: string;
  title: string;
  menbers: string;
}

type HomeProps = {
  episodes: Array<Episode>
}


export default function Home(props: HomeProps) {

  return (
    <p>{JSON.stringify(props.episodes)}</p>
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
  

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8,
  }
}
