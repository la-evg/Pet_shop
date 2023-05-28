/* eslint-disable */
import emailIcon from './email.svg'
import phoneIcon from './phone.svg'
import heartIcon from './heart.svg'
import cartIcon from './cart.svg'
import userIcon from './user.svg'
import exitIcon from './exit.svg'
import styles from './TopHeader.module.scss'
import { TokenLSkey } from '../../../utils/constants'
import { useNavigate } from 'react-router-dom'

export const TopHeader = () => {
  const navigate = useNavigate()

  const cartClickHandler = () => {
    alert('Корзина в разработке')
  }

  const exitClickHandler = () => {
    localStorage.setItem(TokenLSkey, '')
    navigate('/')
  }

  const userClickHandler = () => {
    const tokenObjFromLS = localStorage.getItem(TokenLSkey)
    if (tokenObjFromLS) {
      const tokenObj = JSON.parse(tokenObjFromLS)
      if (tokenObj.token) {
        navigate('user/')
      } else {
        alert('Требуется авторизация')
        navigate('/')
      }
    } else {
      alert('Требуется авторизация.')
      navigate('/')
    }
  }
  return (
    <div className={styles.topHeader}>
      <div className={"container " + styles.container}>
        <ul className={styles.nav}>
          <li>
            <a href="mailto:support@petshop.com">
              <img src={emailIcon} alt="" />support@dogsfoot.com
            </a>
          </li>
          <li>
            <a href="tel:88005553535">
              <img src={phoneIcon} alt="" />88005553535
            </a>
          </li>
        </ul>
        <ul className={styles.nav}>
          <li>
              <img src={userIcon}
                alt="" onClick={userClickHandler}/>
          </li>
          <li>
              <img src={heartIcon} alt="" />
          </li>
          <li>
              <img src={cartIcon} alt="" onClick={cartClickHandler}/>
          </li>
          <li>
              <img src={exitIcon} alt="" onClick={exitClickHandler}/>
          </li>

        </ul>
      </div>
    </div>
  )
}