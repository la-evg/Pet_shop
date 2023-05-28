// import { useEffect } from 'react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../../classes/APIclass'
import { useUserContext } from '../../contexts/UserContext'
import style from './UserData.module.scss'
/* eslint-disable */
export function UserData() {

  const { user, setUser } = useUserContext()
  const navigate = useNavigate()

  console.log('user from UserData')
  console.log(user)
  console.log(!Object.keys(user).length)

  useEffect(() => {
    if (!Object.keys(user).length) {
      const token = api.checkTokenAvailabilityInLS()
      if (!token) {
        alert('Пожалуйста, авторизуйтесь')
        navigate('/')
      } else {
        api.getUserDataRequest(token).then((response) => {
          if (typeof response.err !== 'undefined' || typeof response.error !== 'undefined') {
            console.log('response in UserData: ', response)
            // eslint-disable-next-line max-len, no-alert
            alert(`Ошибка:  ${response.message}. Попробуйте еще раз или зарегистрируйтесь.`)
            navigate('/')
          } else {
            console.log('response from UserData')
            console.log(response)
            setUser(response)
          }
        })
      }
    }
  })

  return (
    <div className={style.block}>
      <div className={style.card}>
        <img className={style.avatar} src={user.avatar} alt={user.name} />
        <h1>{user.name}</h1>
        <p className={style.title}>{user.about}</p>
        <p>{user.email}</p>
        <p><Link to="edit/" className={style.btn}>Изменить информацию</Link></p>
      </div>
      <h3><Link to="/products/">Вернуться к товарам</Link></h3>
    </div>
  )
}

