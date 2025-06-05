import { InputHTMLAttributes, ButtonHTMLAttributes } from 'react'

export type InputProps = InputHTMLAttributes<HTMLInputElement>
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>
export type MessageProps = {
  msg: string
  type: 'error' | 'success'
}

export interface FormComponentProps {
  inputs: InputProps[]
  buttons: ButtonProps[]
  message?: MessageProps
}
