import React from 'react'
import type { Status } from '../../../../packages/types'

type Props = {
  status: Status | null
}

const StatusMessage: React.FC<Props> = ({ status }) => {
  if (!status) return null

  const baseClasses =
    'font-semibold p-4 rounded text-center max-w-md mx-auto my-4'
  const colorClasses =
    status.type === 'success'
      ? 'bg-green-100 text-green-700'
      : 'bg-red-100 text-red-700'

  return (
    <div className={`${baseClasses} ${colorClasses}`}>{status.message}</div>
  )
}

export default StatusMessage
