import { FunctionComponent, useEffect, useState } from "react";
import EventProps from "../interface/InputProps";
import RenderEventProps from "../interface/RenderEventProps";
import IWindowDimension from "../interface/WindowDimenionProps";
import EVENTS from "../utils/inputs.json";
import Event from "./Event";

const RenderEvent: FunctionComponent<RenderEventProps> = () => {
  const [windowDimenion, setWindowDimenion] = useState<IWindowDimension>({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  const detectSize = () => {
    setWindowDimenion({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }

  useEffect(() => {
    window.addEventListener('resize', detectSize)

    return () => {
      window.removeEventListener('resize', detectSize)
    }
  }, [windowDimenion])

  return (
    <div
      className="event-container"
      style={{ height: windowDimenion.height }}
    >
      {EVENTS.map((event: EventProps) => <Event {...event} />)}
    </div >
  );
}

export default RenderEvent;
