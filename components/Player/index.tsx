import styles from './styles.module.scss';

export function Player(){
    
    return (
        <div className={styles.playerContainer}>
            <header>
                <img src="/playing.svg" alt="Tocando"/>
                <strong>Tocando agora</strong>
            </header>

            <div className={styles.emptyplayer}>
                <strong>Selecione um podcast para ouvir</strong>
            </div>

            <footer className={styles.empty}>
                <div className={styles.progressbar}>
                    <span>00:00</span>
                    <div className={styles.slider}>
                        <div className={styles.emptySlider}/>
                    </div>
                    <span>00:00</span>
                </div>

                <div className={styles.buttons}>
                    <button type="button">
                        <img src="/shuffle.svg" alt="Random"/>
                    </button>
                    <button type="button">
                        <img src="/play-previous.svg" alt="previous"/>
                    </button>
                    <button type="button" className={styles.PlayButton}>
                        <img src="/play.svg" alt="play"/>
                    </button>
                    <button type="button" >
                        <img src="/play-next.svg" alt="next"/>
                    </button>
                    <button type="button">
                        <img src="/repeat.svg" alt="play"/>
                    </button>
                </div>
            </footer>
        </div>
    );
}