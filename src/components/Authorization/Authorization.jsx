/* eslint-disable jsx-a11y/label-has-associated-control */
import { Link, useNavigate } from 'react-router-dom'
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik'
import * as Yup from 'yup'
// все сущности библиотеки yup мы импортируем и даем название Yup
import styles from './authorization.module.scss'
import { useUserContext } from '../../contexts/UserContext'
import { TokenLSkey } from '../../utils/constants'
import { api } from '../../classes/APIclass'

const ERROR_MESSAGE = 'Надо заполнить!'

export function Authorization() {
  console.log('Authorization renders')
  const { setUser } = useUserContext()
  const navigate = useNavigate()

  return (
    <div className={styles.block}>
      <h3>Для того, что бы пользоваться магазином вам нужно авторизоваться</h3>

      <Formik
        initialValues={{
          firstName: '',
          email: '',
          password: '',
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email('Введите корректный email')
            .required(ERROR_MESSAGE),
          password: Yup.string()
            .min(5, 'Минимум 5 символов')
            .required(ERROR_MESSAGE),
        })}
        onSubmit={(values) => {
          api.authUserRequest(values.email, values.password).then((response) => {
            if (typeof response.err !== 'undefined' || typeof response.error !== 'undefined') {
              console.log('response in auth: ', response)
              // eslint-disable-next-line max-len, no-alert
              alert(`Ошибка:  ${response.message}. Попробуйте еще раз или зарегистрируйтесь.`)
            } else {
              const LSdata = {
                email: values.email,
                token: response.token,
              }
              localStorage.setItem(TokenLSkey, JSON.stringify(LSdata))
              console.log('authUser, response: ', response)
              setUser(response.data)
              navigate('products/')
            }
          }).catch(alert)
        }}
      >
        <Form className={styles.formContainer}>
          <ErrorMessage
            name="email"
            className={styles.formErrorMessage}
            component="span"
          />
          <Field
            className={styles.formField}
            name="email"
            type="email"
            placeholder="login@mail.com"
          />
          <ErrorMessage
            name="password"
            className={styles.formErrorMessage}
            component="span"
          />
          <Field
            className={styles.formField}
            name="password"
            type="password"
            placeholder="Ваш пароль:"
          />

          <button
            type="submit"
            className={styles.formBtn}
          >
            Авториpизоваться!
          </button>
        </Form>

      </Formik>
      <h3>
        Если вы впервый раз, тогда
        <Link to="/registration"> зарегистрируйтесь:</Link>
      </h3>
    </div>
  )
}
