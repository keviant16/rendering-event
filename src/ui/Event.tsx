import { FunctionComponent, ReactElement } from "react";
import useEvent from "../hook/useEvent";
import useScreen from "../hook/useScreen";
import EventProps from "../interface/EventProps";

/**
 * Render a event
 * @param {EventProps} props The event data  
 * @returns {ReactElement<any, any>} The event component
 */
const Event: FunctionComponent<EventProps> = (props: EventProps): ReactElement<any, any> => {
  const { id } = props;

  /** HOOKS **/
  const screen = useScreen();
  const { position, height, width } = useEvent(screen, { ...props })


  return (
    <div
      className={"event n°" + id}
      style={{
        top: position.top,
        height: height,
        width: width - 2,
        left: position.left
      }}
    >
      {id}
    </div>
  );
}

export default Event;