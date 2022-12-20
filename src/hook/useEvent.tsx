import { useMemo } from "react"
import ScreenProps from "../interface/ScreenProps"

/**
 * 
 * @param screen 
 * @param start 
 * @returns 
 */
const useEvent = (screen: ScreenProps, start: string, duration: number) => {

  /**
   * 
   */
  const position = useMemo(() => {
    const hours = parseInt(start.substring(0, 2))
    const minutes = parseInt(start.substring(3, 5))
    return (screen.height / 12) * ((hours - 9) + minutes / 60)
  }, [screen.height])

  /**
   * 
   */
  const height = useMemo(() => {
    return ((screen.height / 12) * duration) / 60
  }, [screen.height])

  return {
    position,
    height
  }
}

export default useEvent;