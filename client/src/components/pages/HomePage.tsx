import styles from './homepage.module.css'
import { FC, useEffect, useRef, useState } from 'react'
import { RequestService } from '../../services/request.service'
import clsx from 'clsx'
import { RequestModal } from '../layout/RequestModal/RequestModal'
import { Button } from '../layout/Button/Button'
import { IRequestData } from '../../types/request'

export const HomePage: FC = () => {
  const [requests, setRequests] = useState<IRequestData[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isError, setIsError] = useState(false)
  const modalRef = useRef<HTMLDialogElement>(null)

  const pickColor = (text: string) => {
    return clsx({
      [styles.greenText]:
        text === 'Выполнено' || text === 'Новая функциональность',
      [styles.blueText]: text === 'В работе' || text === 'Документация',
      [styles.redText]: text === 'Ошибка',
      [styles.yellowText]: text === 'В очереди' || text === 'Улучшение',
    })
  }

  useEffect(() => {
    const getRequests = async () => {
      setIsError(false)
      const data = await RequestService.getAll()
      if (data) {
        setRequests(data)
      } else {
        setIsError(true)
      }
    }

    getRequests()
  }, [isModalOpen])

  const handleModalOpen = () => {
    setIsModalOpen(true)
    modalRef.current?.showModal()
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    modalRef.current?.close()
  }

  return (
    <div>
      <RequestModal handleClose={handleModalClose} ref={modalRef} />
      <div className={styles.header}>
        <Button onClick={handleModalOpen}>Новый запрос</Button>
        <div>1 из 1</div>
        <div className={styles.arrowContainer}>
          <img
            className={styles.arrowLeft}
            src={'arrow-right.svg'}
            alt="arrow left"
          />
          <img
            className={styles.arrowRight}
            src={'arrow-right.svg'}
            alt="arrow right"
          />
        </div>
      </div>
      {isError && <div>Что-то пошло не так, перезагрузите страницу</div>}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>
              <p>Номер запроса</p>
            </th>
            <th>
              <p>Тип запроса</p>
            </th>
            <th>
              <p>Описание</p>
            </th>
            <th>
              <p>Пользователь</p>
            </th>
            <th>
              <p>Дата</p>
            </th>
            <th>
              <p>Статус</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={`${req.id}${req.description}`}>
              <td>
                <a href="#">{req.id}</a>
              </td>
              <td>
                <span className={pickColor(req.request_type)}>
                  {req.request_type}
                </span>
              </td>
              <td>
                <p>{req.description}</p>
              </td>
              <td>
                <p>{req.author}</p>
              </td>
              <td>{req.date}</td>
              <td>
                <span className={pickColor(req.status)}>{req.status}</span>
              </td>
            </tr>
          ))}
          {[...Array(12 - requests.length)].map((_, index) => (
            <tr key={index} className={styles.blankLine}></tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
