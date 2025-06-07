import clsx from 'clsx'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'

type ButtonProps = {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary' | 'outline'
  as?: 'button' | 'a'
} & ButtonHTMLAttributes<HTMLButtonElement> &
  AnchorHTMLAttributes<HTMLAnchorElement>

const Button = ({
  className = '',
  children,
  size = 'md',
  variant = 'primary',
  as = 'button',
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
  if (as === 'a') {
    return (
      <a
        role='button'
        className={clsx(
          'inline-block cursor-pointer no-underline',
          baseStles,
          variantClass,
          sizeClass,
          className
        )}
        {...props}
      >
        {children}
      </a>
    )
  }

  return (
    <button className={clsx(baseStles, variantClass, sizeClass, className)} {...props}>
      {children}
    </button>
  )
}

export default Button
