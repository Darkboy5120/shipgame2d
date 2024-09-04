import { useRef } from "react"
import "./style.scss"
import useGameCore from "./useGameCore"

const GameCore = () => {
  const ref = useRef<HTMLDivElement>(null)
  const {} = useGameCore({ ref })

  return (
    <div ref={ref} className="gameCore">
    </div>
  )
}

export default GameCore
