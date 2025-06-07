import clsx from 'clsx'
import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary' | 'outline'
}

const Button = ({
  className = '',
  children,
  size = 'md',
  variant = 'primary',
  ...props
}: ButtonProps) => {
  const baseStles = 'rounded font-semibold shadow transition'

  const variantClass = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    outline: 'border border-blue-600 text-blue-600 hover:bg-blue-50',
  }[variant]

  const sizeClass = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }[size]

  return (
    <button className={clsx(baseStles, variantClass, sizeClass, className)} {...props}>
      {children}
    </button>
  )
}

export default Button
