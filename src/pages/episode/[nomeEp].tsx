import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useRouter } from 'next/router';
import { api } from '../../services/api';
import  Link  from 'next/Link';
import Image from 'next/image';
import { useContext } from 'react';
import Head from 'next/Head';

import { playerContext } from '../../context/playerContext';
import { GetStaticPaths, GetStaticProps } from 'next/types';
import { convertDurationToTimeString } from '../../utilis/convertDurationToTimeString';

import styles from './episode.module.scss';

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
type EpisodeProps = {
    episode: Episode,
}

export default function Episode({episode} : EpisodeProps ) {
    const router = useRouter();
    const { play } = useContext(playerContext);

    if(router.isFallback){
        return <p> Carregando ... </p>
    }

    return (
        <div className={styles.episodeContainer}>
            <Head>
                <title>{episode.title}</title>
            </Head>

            <div className={styles.episode}>
                <div className={styles.thumbnailContainer}>
                    <Link href="/">
                        <button type="button">
                            <img src="/arrow-left.svg" alt="Voltar"/>
                        </button>
                    </Link>
                    <Image width={700} height={160} src={episode.thumbnail} objectFit="cover" />
                    <button type="button" onClick={() => play(episode)}>
                        <img src="/play.svg" alt="Tocar"/>
                    </button>
                </div>

                <header>
                    <h1>{episode.title}</h1>
                    <span>{episode.members}</span>
                    <span>{episode.publishedAt}</span>
                    <span>{episode.durationAsString}</span>
                </header>

                <div 
                    className={styles.description} 
                    dangerouslySetInnerHTML={{__html: episode.description}} 
                />
            </div>
        </div>
    )
}

export const getStaticPaths: GetStaticPaths =  async () => {
    // buscar  2 ultimos episodios e poi na paths, como provavelmente es eh kes mas acessado,
    // ncreh tenes td criado estaticamente e pontu pa users

    // Ta pega na dados de kes 2 paginas
    const {data} = await api.get('episodes',{
        params: {
            _limit:2,
            _sort:'published_at',
            _order:'desc'
        }
    });

    // como caminho de kes pagias eh ses id, nta pega na id pam associa a nha slug ki tem nome "momeEp"
    const pathsEp = data.map(episodes =>{
        return {
            params: {
                nomeEp: episodes.id
            }
        }
    })

    return {
        paths: pathsEp,
        fallback: 'blocking'
    }

    // PATHS eh caminho de kes paginas ki creh pe gera na build, ou seja logo na executa eh ta criadu
    // pa pode fica mas rapido, e kes pag eh td estatico.

    // FALLBACK tem 3 opson :
    // False -> hr k scodju false, eh ta gera apenas kes paginas estaticos kin define na PATHS, se nca define nada, eh ca ta gera nenhum pagina.

    // True -> Eh ta gera td paginas na momento ku user clica na kel link de kel pagina, 
        //execuson ta ser na lado cliente na browser, pagina ser caregadu na momento.

    // Blocking -> Eh ta gera td paginas na camada NEXT. Se ndefine paginas na PATHS eh ta cria kes paginas la estaticamente na build.
        // hora k user bai acessa kes paginas la ta atxal td criado e kes otus paginas ta ser criado na momento que acessado.
        // eh recomendado pa kestoes de SO e pa crawlers pode leh pag,
    
}

export  const getStaticProps: GetStaticProps = async (ctx) => {
    const { nomeEp } = ctx.params;

    const { data } = await api.get(`/episodes/${nomeEp}`);

    const episode = {
        id: data.id,
        title: data.title,
        thumbnail: data.thumbnail,
        members: data.members,
        publishedAt: format(parseISO(data.published_at), 'd MMM yy', { locale: ptBR }),
        description: data.description,
        duration: Number(data.file.duration),
        durationAsString: convertDurationToTimeString(Number(data.file.duration)),
        url: data.file.url,
    };

    return{
        props: {
            episode,
        },
        revalidate: 60 * 60 * 24, // 24 hours
    }
}