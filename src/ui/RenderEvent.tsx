import { FunctionComponent, ReactElement } from "react";
import useEvent from "../hook/useEvent";
import useScreen from "../hook/useScreen";
import EventProps from "../interface/EventProps";
import RenderEventProps from "../interface/RenderEventProps";
import EVENTS from "../util/inputs.json";
import Event from "./Event";

/**
 * Render the list of event
 * @returns {ReactElement<any, any>} The RenderEvent component
 */
const RenderEvent: FunctionComponent<RenderEventProps> = (): ReactElement<any, any> => {
  const screen = useScreen()
  // const { events } = useEvent(screen)


  return (
    <div
      className="event-container"
      style={{ height: screen.height, width: screen.width }}
    >
      {EVENTS.map((event: EventProps) => <Event key={event.id} {...event} />)}
    </div >
  );
}

export default RenderEvent;
