import styles from './pattern.module.css';

export const RhombusPattern = () => {
    return (
        <>
            <div
                className={styles.rombus_pattern}
                style={{
                    top: '-10%',
                    left: '65%'
                }}
            />
            <div
                className={styles.rombus_pattern}
                style={{
                    top: '60%',
                    left: '15%'
                }}
            />
        </>
    );
};
