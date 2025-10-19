import styles from './Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faChartBar, faFile } from '@fortawesome/free-regular-svg-icons';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

type HeaderProps = {
    title?: string;
    year?: number;
    month?: number; // 1-12
    onPrevMonth?: () => void;
    onNextMonth?: () => void;
};

export function Header({
    title = 'Wise Wallet',
    year = new Date().getFullYear(),
    month = new Date().getMonth() + 1,
    onPrevMonth,
    onNextMonth,
}: HeaderProps) {
    const navigate = useNavigate();
    const monthName = new Date(year, month - 1).toLocaleString('en-US', {
        month: 'long',
    });

    return (
            <header className={styles.header}>
                <div className={styles.inner}>
                    <div className={styles.left}>
                        <a href="/" className={styles.brandLink} aria-label="Go to home">
                            <span className={styles.brand}>{title}</span>
                        </a>
                    </div>

                    <div className={styles.center}>
                        <button
                            className={styles.navBtn}
                            aria-label="Previous month"
                            type="button"
                            onClick={onPrevMonth}
                        >
                            <FontAwesomeIcon icon={faAngleLeft} />
                        </button>
                        <div className={styles.monthBox}>
                            <div className={styles.year}>{year}</div>
                            <div className={styles.monthNumber}>{month}</div>
                            <div className={styles.monthName}>{monthName}</div>
                        </div>
                        <button
                            className={styles.navBtn}
                            aria-label="Next month"
                            type="button"
                            onClick={onNextMonth}
                        >
                            <FontAwesomeIcon icon={faAngleRight} />
                        </button>
                    </div>

                    <div className={styles.right}>
                        <button
                            className={styles.iconButton}
                            aria-label="List view"
                            type="button"
                            onClick={() => navigate('/main')}
                        >
                            <FontAwesomeIcon icon={faFile} />
                        </button>
                        <button
                            className={styles.iconButton}
                            aria-label="Calendar view"
                            type="button"
                            onClick={() => navigate('/calendar')}
                        >
                            <FontAwesomeIcon icon={faCalendar} />
                        </button>
                        <button
                            className={styles.iconButton}
                            aria-label="Chart view"
                            type="button"
                            onClick={() => navigate('/charts')}
                        >
                            <FontAwesomeIcon icon={faChartBar} />
                        </button>
                    </div>
                </div>
            </header>
    );
}
