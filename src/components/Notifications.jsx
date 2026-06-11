import { IoCheckmarkCircle, IoCloseCircle, IoInformationCircle } from 'react-icons/io5'
import { useApp } from '../context/AppContext'

const icons = {
  success: IoCheckmarkCircle,
  error: IoCloseCircle,
  info: IoInformationCircle,
}

export default function Notifications() {
  const { notifications } = useApp()

  if (notifications.length === 0) return null

  return (
    <div className="notifications" aria-live="polite">
      {notifications.map((n) => {
        const Icon = icons[n.type] || IoInformationCircle
        return (
          <div key={n.id} className={`notification notification--${n.type}`}>
            <Icon className="notification__icon" aria-hidden="true" />
            <p>{n.message}</p>
          </div>
        )
      })}
    </div>
  )
}
