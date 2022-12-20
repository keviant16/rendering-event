import { FunctionComponent } from "react";
import useScreen from "../hook/useScreen";
import EventProps from "../interface/EventProps";
import RenderEventProps from "../interface/RenderEventProps";
import EVENTS from "../util/inputs.json";
import Event from "./Event";

/**
 * Render the event container component
 * @returns List of events
 */
const RenderEvent: FunctionComponent<RenderEventProps> = () => {
  const screen = useScreen()

  return (
    <div
      className="event-container"
      style={{
        height: screen.height,
        width: screen.width
      }}
    >
      {EVENTS.map((event: EventProps) => <Event key={event.id} {...event} />)}
    </div >
  );
}

export default RenderEvent;
