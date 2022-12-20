import { FunctionComponent } from "react";
import useEvent from "../hook/useEvent";
import useScreen from "../hook/useScreen";
import EventProps from "../interface/EventProps";

/**
 * Render a event component
 * @param props 
 * @returns Event
 */
const Event: FunctionComponent<EventProps> = (props) => {
  const { id } = props;
  const screen = useScreen();
  const { positionTop, height, width, positionLeft } = useEvent(screen, { ...props })


  return (
    <div
      className={"event n°" + id}
      style={{
        top: positionTop,
        height: height,
        width: width - 2,
        left: positionLeft
      }}
    >
      {id}
    </div>
  );
}

export default Event;