import { useEffect, useState } from "react"
import ScreenProps from "../interface/ScreenProps"

/**
 * Track and update the screen width and height
 * @returns {ScreenProps} The screen width and height
 */
const useScreen = (): ScreenProps => {

  /**
   * The screen statement
   */
  const [screen, setScreen] = useState<ScreenProps>({
    width: window.innerWidth,
    height: window.innerHeight,
  })


  /**
   * Trigger the screen statement update when the window change size 
   */
  useEffect(() => {
    window.addEventListener('resize', detectSize)

    return () => {
      window.removeEventListener('resize', detectSize)
    }
  }, [screen])


  /**
   * Update the screen width and height
   */
  const detectSize = () => {
    setScreen({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }

  return screen;
}

export default useScreen;