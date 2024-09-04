import { RefObject } from "react"

export interface ShipMovement {
  direction: MovementDirection
  speed: number
  lastDirection: MovementDirection
}

export interface Ship {
  position: { x: number, y: number }
  movement: ShipMovement
  height: number
  width: number
  ref: RefObject<HTMLDivElement>
}

export interface Controls {
  top: boolean
  right: boolean
  bottom: boolean
  left: boolean
}

export type MovementDirection = "top" | "right" | "bottom" | "left" | undefined