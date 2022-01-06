import styles from './styles.module.scss';
import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

export function Header(){
    const currentdata = format(new Date(), 'EEEEEE, d MMMM', { 
        locale: ptBR,
    });

    return (
        <header className={styles.headerContainer}>
            <img src="/logo.svg" alt="Podcaster"/>
            <p>O melhor para voce ouvir, sempre</p>

            <span>{currentdata}</span>
        </header>
    );
}