import { FunctionComponent } from "react";
import EventProps from "../interface/InputProps";


const Event: FunctionComponent<EventProps> = (props) => {
  const { id, start, duration } = props

  return (<div className="event">{id}</div>);
}

export default Event;