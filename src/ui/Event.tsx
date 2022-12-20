import { FunctionComponent, useMemo } from "react";
import useEvent from "../hook/useEvent";
import useScreen from "../hook/useScreen";
import EventProps from "../interface/EventProps";

/**
 * Render a event component
 * @param props 
 * @returns Event
 */
const Event: FunctionComponent<EventProps> = (props) => {
  const { id, start, duration } = props;
  const screen = useScreen();
  const { position, height } = useEvent(screen, start, duration)


  return (
    <div
      className={"event n°" + id}
      style={{
        top: position,
        height: height
      }}
    >
      {id}
    </div>
  );
}

export default Event;