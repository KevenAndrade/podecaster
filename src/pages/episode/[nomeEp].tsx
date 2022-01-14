import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useRouter } from 'next/router';
import { api } from '../../services/api';
import  Link  from 'next/Link';
import Image from 'next/image';


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

    return (
        <div className={styles.episodeContainer}>
            <div className={styles.episode}>
                <div className={styles.thumbnailContainer}>
                    <Link href="/">
                        <button type="button">
                            <img src="/arrow-left.svg" alt="Voltar"/>
                        </button>
                    </Link>
                    <Image width={700} height={160} src={episode.thumbnail} objectFit="cover" />
                    <button type="button">
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
    return {
        paths: [],
        fallback: 'blocking'
    }
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