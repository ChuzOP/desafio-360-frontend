import styles from './canvas.module.css';
import { ShoppingCart } from '@mui/icons-material';

export const LogoCustom = () => {
    return (
        <div className={styles.logoContainer}>
            <div className={styles.logo}>
                <div className={styles.parallelogram}></div>
                <div className={styles.parallelogramOverlay}></div>
                <span className={styles.title}>MiTiendita</span>
                <div className={styles.tag}>
                    <ShoppingCart
                        className={styles.shoppingCart}
                        style={{ color: '#000c' }}
                    />
                </div>
            </div>
        </div>
    );
};
