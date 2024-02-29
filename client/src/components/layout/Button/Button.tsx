import styles from './button.module.css'
import React, { FC } from 'react'

type buttonProps = {
  children: React.ReactNode
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type']
  onClick?: React.ButtonHTMLAttributes<HTMLButtonElement>['onClick']
}
export const Button: FC<buttonProps> = ({ children, type, onClick }) => {
  return (
    <button type={type} onClick={onClick} className={styles.button}>
      {children}
    </button>
  )
}
