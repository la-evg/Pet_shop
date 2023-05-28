/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import regStyles from './registration.module.scss'
import { useUserContext } from '../../contexts/UserContext'
import { api } from '../../classes/APIclass'
import { TokenLSkey } from '../../utils/constants'

const ERROR_MESSAGE = 'Надо заполнить!'

export function Registration() {
  console.log('Registration renders')
  const { setUser } = useUserContext()
  const navigate = useNavigate()

  return (
    <div className={regStyles.block}>
      <h2>Страничка регистрации</h2>
      <Formik
        initialValues={{
          email: '',
          password: '',
          checkbox: false,
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email('Что-то не похоже это на адрес электронной почты...`')
            .required(ERROR_MESSAGE),
          password: Yup.string()
            .min(5, 'Минимум 5 символов')
            .required(ERROR_MESSAGE),
          checkbox: Yup.boolean()
            .required(ERROR_MESSAGE)
            .oneOf([true], 'Подтверждение обязательно'),
        })}
        onSubmit={(values) => {
          api.regUserRequest(values.email, values.password).then((response) => {
            if (typeof response.err !== 'undefined' || typeof response.error !== 'undefined') {
              console.log('response in regUser: ', response)
              alert(`Ошибка:  ${response.message}. Попробуйте еще раз.`)
            } else {
              console.log('регистрация прошла успешно')
              setUser(response)
              api.authUserRequest(values.email, values.password).then((responseAuth) => {
                const LSdata = {
                  email: values.email,
                  token: responseAuth.token,
                }
                localStorage.setItem(TokenLSkey, JSON.stringify(LSdata))
                navigate('/user/')
              })
            }
          }).catch(alert)
        }}
      >
        <Form className={regStyles.formContainer}>
          <ErrorMessage
            name="email"
            className={regStyles.formErrorMessage}
            component="span"
          />
          <Field
            className={regStyles.formField}
            label="Адрес электронной почты:"
            name="email"
            type="email"
            placeholder="login@mail.com"
          />

          <ErrorMessage
            name="password"
            className={regStyles.formErrorMessage}
            component="span"
          />
          <Field
            className={regStyles.formField}
            label="Придумайте свой пароль:"
            name="password"
            type="password"
            placeholder="Придумайте свой пароль:"
          />

          <label>
            <ErrorMessage
              name="checkbox"
              className={regStyles.formErrorMessage}
              component="p"
            />
            <Field
              className={regStyles.check}
              label="Я согласен(-на) на обработку персональных данных"
              type="checkbox"
              name="checkbox"
            />

            Я согласен(-на) на обработку персональных данных
          </label>
          <button
            type="submit"
            className={regStyles.formBtn}
          >
            Зарегистрироваться!
          </button>
        </Form>
      </Formik>
      <p>
        Уже зарегистрированы?
        <Link to="/"> Авторизоваться</Link>
      </p>
    </div>
  )
}
