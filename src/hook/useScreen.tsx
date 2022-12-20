import { useEffect, useState } from "react"
import ScreenProps from "../interface/ScreenProps"

/**
 * Custom hook to 
 * @returns 
 */
const useScreen = () => {
  const [screen, setScreen] = useState<ScreenProps>({
    width: window.innerWidth,
    height: window.innerHeight,
  })


  useEffect(() => {
    window.addEventListener('resize', detectSize)

    return () => {
      window.removeEventListener('resize', detectSize)
    }
  }, [screen])

  /**
  * Update sceen width
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