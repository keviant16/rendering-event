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
  const { position } = useEvent(screen, start)


  return (
    <div
      className={"event n°" + id}
      style={{
        top: position,
      }}
    >
      {id}
    </div>
  );
}

export default Event;