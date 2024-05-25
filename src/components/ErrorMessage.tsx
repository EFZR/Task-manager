import { ReactNode } from "react"
import "../styles/ErrorMessage.css"

export default function ErrorMessage({ children }: { children: ReactNode }) {
  return (
    <div className="error__message">
      {children}
    </div>
  )
}
