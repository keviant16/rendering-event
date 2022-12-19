import { FunctionComponent, useMemo } from "react";
import useScreen from "../hook/useScreen";
import EventProps from "../interface/EventProps";

const Event: FunctionComponent<EventProps> = (props) => {
  const { id, start, duration } = props;
  const screen = useScreen();
  const heightPerHour = useMemo(() => screen.height / 12, [screen.height]);

  const convertToPosition = (start: string) => {
    const hours = parseInt(start.substring(0, 2))
    const minutes = parseInt(start.substring(3, 5))
    const res = (hours - 9) * 60 + ((minutes * heightPerHour) / 60)
    return res
  }

  return (
    <div
      className={"event n°" + id}
      style={{
        top: convertToPosition(start),
        width: screen.width - 2,
        height: (duration * heightPerHour) / 60
      }}
    >
      {id}
    </div>
  );
}

export default Event;