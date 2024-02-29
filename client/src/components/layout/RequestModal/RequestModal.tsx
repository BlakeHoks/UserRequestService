import styles from './requestModal.module.css'
import React, { forwardRef, useEffect, useState } from 'react'
import { RequestService } from '../../../services/request.service'
import { Button } from '../Button/Button'
import { actions } from '../../../store/requestForm/requestForm.slice'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { RequestCreate } from '../../../types/request'

const initialState = {
  request_type: '',
  author: '',
  description: '',
}
type modalProps = {
  handleClose: () => void
}
export const RequestModal = forwardRef<HTMLDialogElement, modalProps>(
  ({ handleClose }, ref) => {
    const [errors, setErrors] = useState(initialState)
    const dispatch = useAppDispatch()
    const request = useAppSelector(({ request }) => request)

    useEffect(() => {
      const today = new Date()
      const date = `${today.getDate() < 10 ? 0 : ''}${today.getDate()}.${today.getMonth() + 1 < 10 ? 0 : ''}${today.getMonth() + 1}.${today.getFullYear()}`
      dispatch(actions.updateDate(date))
    }, [])

    const validate = (values: RequestCreate) => {
      const errors: any = {}
      let hasErrors: boolean = false

      if (!values.author) {
        errors.author = 'Введите ваше ФИО'
        hasErrors = true
      }

      if (!values.request_type) {
        errors.request_type = 'Выберите тип запроса'
        hasErrors = true
      }

      if (!values.description) {
        errors.description = 'Введите описание запроса'
        hasErrors = true
      }

      setErrors(errors)
      return hasErrors
    }

    const sendData = (e: any) => {
      e.preventDefault()
      if (!validate(request)) {
        const sendRequest = async (data: RequestCreate) => {
          await RequestService.create(data)
        }
        sendRequest(request)
        handleClose()
      }
    }

    return (
      <dialog ref={ref} className={styles.dialog}>
        <form className={styles.container} onSubmit={(e) => sendData(e)}>
          <div className={styles.inputBox}>
            <div className={styles.spanBox}>
              <span>Автор обращения</span>
              <span className={styles.errorMessage}>{errors.author}</span>
            </div>
            <input
              onBlur={(e) => dispatch(actions.updateAuthor(e.target.value))}
              className={styles.input}
              placeholder="ФИО"
            />
          </div>
          <div className={styles.inputBox}>
            <div className={styles.spanBox}>
              <span>Тип запроса</span>
              <span className={styles.errorMessage}>{errors.request_type}</span>
            </div>
            <select
              className={styles.select}
              onBlur={(e) =>
                dispatch(actions.updateRequestType(e.target.value))
              }
            >
              <option value="Ошибка">Ошибка</option>
              <option value="Новая функциональность">
                Новая функциональность
              </option>
              <option value="Улучшение">Улучшение</option>
              <option value="Документация">Документация</option>
            </select>
          </div>
          <div className={styles.inputBox}>
            <div className={styles.spanBox}>
              <span>Добавить описание</span>
              <span className={styles.errorMessage}>{errors.description}</span>
            </div>
            <textarea
              onBlur={(e) =>
                dispatch(actions.updateDescription(e.target.value))
              }
              placeholder="Введите описание запроса"
              className={styles.textArea}
            />
          </div>
          <div className={styles.btnBlock}>
            <Button type="submit">Сохранить</Button>
            <Button onClick={handleClose}>Закрыть</Button>
          </div>
        </form>
      </dialog>
    )
  },
)
