/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { api } from '../../classes/APIclass'
import { useUserContext } from '../../contexts/UserContext'
import styles from './useredit.module.scss'

export function UserEdit() {
  const { user, setUser } = useUserContext()
  const navigate = useNavigate()
  console.log('user from UserEdit')
  console.log(user)
  const ERROR_MESSAGE = 'Надо заполнить!'

  const cancelHandler = () => {
    navigate('/user/')
  }

  return (
    <div className={styles.block}>
      <p>Расскажите нам о себе:</p>
      <img src={user.avatar} alt="Ваш аватар" width="100px" />
      <br />
      <Formik
        initialValues={{
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email: user.email,
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .max(30, 'Минимум 30 символов!')
            .required(ERROR_MESSAGE),
          about: Yup.string()
            .max(30, 'Минимум 30 символов!')
            .required(ERROR_MESSAGE),
          avatar: Yup.string()
            .max(3000, 'Слишком длинная ссылка')
            .required(ERROR_MESSAGE),
        })}
        onSubmit={(values) => {
          // ВЫЗОВ ЗАПРОСА НА ИЗМЕНЕНИЕ ДАННЫХ ПОЛЬЗОВАТЕЛЯ
          console.log('reg: values', { values })
          // regUser(values.email, values.password)
          api.editUserDataRequest(values.name, values.about).then((response) => {
            console.log(response)
            setUser(response)
            navigate('/user')
          })
          api.editUserAvatar(values.avatar).then((response) => {
            setUser(response)
            navigate('/user')
          })
        }}
      >
        <Form className={styles.formContainer}>
          <label htmlFor="avatar">Ссылка на аватар </label>
          <Field
            id="avatar"
            className={styles.formField}
            label="avatar"
            name="avatar"
            type="text"
          />
          <label htmlFor="name">Имя: </label>
          <Field
            id="name"
            className={styles.formField}
            label="Name"
            name="name"
            type="text"
          />
          <ErrorMessage
            name="name"
            className={styles.formErrorMessage}
            component="span"
          />
          <label htmlFor="about">О себе: </label>
          <Field
            className={styles.formField}
            label="About"
            name="about"
            type="text"
          />
          <ErrorMessage
            name="about"
            className={styles.formErrorMessage}
            component="span"
          />
          <label htmlFor="email">Адрес электронной почты: </label>
          <Field
            className={styles.formField}
            label="Адрес электронной почты:"
            name="email"
            type="email"
            disabled
          />
          <br />
          <button
            type="submit"
            className={styles.formBtn}
          >
            Обновить данные!
          </button>
        </Form>
      </Formik>
      <button
        type="button"
        className={styles.btn}
        onClick={cancelHandler}
      >
        Вернуться назад без сохранений!
      </button>
    </div>
  )
}
