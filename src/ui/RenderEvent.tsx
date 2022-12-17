import { FunctionComponent, useEffect, useState } from "react";
import useScreen from "../hook/useScreen";
import EventProps from "../interface/EventProps";
import RenderEventProps from "../interface/RenderEventProps";
import EVENTS from "../utils/inputs.json";
import Event from "./Event";

const RenderEvent: FunctionComponent<RenderEventProps> = () => {
  const screen = useScreen()
  return (
    <div
      className="event-container"
      style={{ height: screen.height }}
    >
      {EVENTS.map((event: EventProps) => <Event key={event.id} {...event} />)}
    </div >
  );
}

export default RenderEvent;
