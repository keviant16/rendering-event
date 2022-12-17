import { FunctionComponent } from "react";
import useScreen from "../hook/useScreen";
import EventProps from "../interface/EventProps";

const Event: FunctionComponent<EventProps> = (props) => {
  const { id, start, duration } = props
  const screen = useScreen()

  //convert start hour to number start position in pixel
  const convertHourToPosition = (hour: string): number => {
    const hourWithoutColon = hour.replace(":", "")
    const hourToInt = parseInt(hourWithoutColon)

    //adapt to current screen
    const position = (hourToInt - 900)
    return position
  }

  return (
    <div
      className="event"
      style={{
        top: convertHourToPosition(start),
        width: screen.width
      }}
    >
      {id}
    </div>
  );
}

export default Event;