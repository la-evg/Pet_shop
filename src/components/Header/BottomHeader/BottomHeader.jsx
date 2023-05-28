/* eslint-disable */
import { Link, useNavigate } from 'react-router-dom'
import logo from './logo.png'
import styles from './BottomHeader.module.scss'
import { SearchBar } from '../../SearchBar/SearchBar'

export const BottomHeader = () => {
  return (
      <div className ={ styles.bottomHeader} >
        <div>
          <div className="container">
            <div className={styles.nav}>
              <a className={styles.logoLink}>
                <img className={styles.logo} src={logo} alt="" />
              </a>
              <ul className={styles.navList}>
                <li><Link to="/products/">К товарам</Link></li>
                <li><Link to="">Акции</Link></li>
                <li><Link to="">Новости</Link></li>
                <li><Link to="">Отзывы</Link></li>
                <li><Link to="">Контакты</Link></li>
              </ul>
              <SearchBar />
            </div>
          </div>
        </div>
      </div>
  )
}