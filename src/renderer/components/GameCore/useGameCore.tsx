import { RefObject, useCallback, useEffect, useRef, useState } from "react"
import { Controls, MovementDirection, Ship, ShipMovement } from "./types"

interface useGameCoreProps {
  ref: RefObject<HTMLDivElement>
}

const useGameCore = (props: useGameCoreProps) => {
  const { ref } = props
  const shipRef = useRef(document.createElement("div"))

  const [ship, setShip] = useState<Ship>({
    position: { x: 100, y: 100 },
    movement: { direction: undefined, speed: 1, lastDirection: undefined },
    height: 10,
    width: 10,
    ref: shipRef
  })

  const [controls, setControls] = useState<Controls>({
    top: false,
    right: false,
    bottom: false,
    left: false
  })

  const getShipSpeed = useCallback((movement: ShipMovement) => {
    const { speed, lastDirection, direction } = movement
    // console.log(direction, lastDirection)
    const SHIP_SPEED_CAP = 30
    if (lastDirection === direction) {
      return speed < SHIP_SPEED_CAP ? speed + 1 : speed
    }
    return 1
  }, [ship])

  const move = useCallback((direction: MovementDirection) => {
    const { x, y } = ship.position
    let newX = x, newY = y
    const shipSpeed = getShipSpeed({ ...ship.movement, direction, lastDirection: ship.movement.direction })
    if (direction === "top") {
      newY -= shipSpeed
    } else if (direction === "right") {
      newX += shipSpeed
    } else if (direction === "bottom") {
      newY += shipSpeed
    } else if (direction === "left") {
      newX -= shipSpeed
    }
    setShip({
      ...ship,
      position: { x: newX, y: newY },
      movement: {
         ...ship.movement,
         direction,
         lastDirection: ship.movement.direction,
         speed: shipSpeed
      }
    })
  }, [ship, getShipSpeed])

  const updateShipFrame = useCallback((shipElement: HTMLElement) => {
    shipElement.style.width = `${ship.width}px`
    shipElement.style.height = `${ship.height}px`
    shipElement.style.left = `${ship.position.x}px`
    shipElement.style.top = `${ship.position.y}px`
  }, [ship])

  // CREATES SHIP
  useEffect(() => {
    if (ship.ref.current) {
      const shipElement = ship.ref.current
      updateShipFrame(shipElement)
      shipElement.classList.add("ship")
      ref.current?.appendChild(shipElement)
    }
  }, [])

  useEffect(() => {
    if (ship.ref.current) {
      updateShipFrame(ship.ref.current)
    }
  }, [ship])

  // CONTROLS
  useEffect(() => {
    const keybindsKeydown = (e: KeyboardEvent) => {
      if (e.code === "ArrowUp") {
        setControls(prev => ({ ...prev, top: true }))
      } if (e.code === "ArrowRight") {
        setControls(prev => ({ ...prev, right: true }))
      } if (e.code === "ArrowDown") {
        setControls(prev => ({ ...prev, bottom: true }))
      } if (e.code === "ArrowLeft") {
        setControls(prev => ({ ...prev, left: true }))
      }
    }
    window.addEventListener("keydown", keybindsKeydown)

    const keybindsKeyup = (e: KeyboardEvent) => {
      if (e.code === "ArrowUp") {
        setControls(prev => ({ ...prev, top: false }))
      } if (e.code === "ArrowRight") {
        setControls(prev => ({ ...prev, right: false }))
      } if (e.code === "ArrowDown") {
        setControls(prev => ({ ...prev, bottom: false }))
      } if (e.code === "ArrowLeft") {
        setControls(prev => ({ ...prev, left: false }))
      }
    }
    window.addEventListener("keydown", keybindsKeyup)

    return () => {
      window.removeEventListener("keydown", keybindsKeydown)
      window.removeEventListener("keyup", keybindsKeyup)
    }
  }, [])

  useEffect(() => {
    const { top, right, bottom, left } = controls
    // console.log(controls)
    if (top) {
      move("top")
    } else if (right) {
      move("right")
    } else if (bottom) {
      move("bottom")
    } else if (left) {
      move("left")
    } else {
      console.log("reset", controls)
      // setShip(prev => ({ ...prev, movement: { ...prev.movement, direction: undefined, lastDirection: prev.movement.direction } }))
    }
  }, [controls])

  return {}
}

export default useGameCore
