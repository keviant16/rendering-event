import { FunctionComponent, useMemo } from "react";
import useScreen from "../hook/useScreen";
import EventProps from "../interface/EventProps";

//CONSTANTS
const BORDER_SIZE = 2
const TOTAL_HOUR_NUMBER = 12
const START_HOUR = 9
const MINUTES_PER_HOUR = 59

/**
 * Render a event component
 * @param props 
 * @returns Event
 */
const Event: FunctionComponent<EventProps> = (props) => {
  const { id, start, duration } = props;
  const screen = useScreen();
  const heightPerHour = useMemo(() => screen.height / TOTAL_HOUR_NUMBER, [screen.height]);

  /**
   * Convert start to top position
   * @param start 
   * @returns Posistion from top
   */
  const convertToPosition = (start: string): number => {
    const hours = parseInt(start.substring(0, 2))
    const minutes = parseInt(start.substring(3, 5))
    const position = (hours - START_HOUR) * MINUTES_PER_HOUR + ((minutes * heightPerHour) / MINUTES_PER_HOUR)
    return position
  }

  return (
    <div
      className={"event n°" + id}
      style={{
        top: convertToPosition(start),
        width: screen.width - BORDER_SIZE, //TODO: Find x scroll bar origin
        height: (((duration * heightPerHour) / MINUTES_PER_HOUR) - BORDER_SIZE)
      }}
    >
      {id}
    </div>
  );
}

export default Event;