import { useCallback, useMemo, } from "react"
import EventProps from "../interface/EventProps";
import HourProps from "../interface/HourProps";
import PositionProps from "../interface/PositionProps";
import ScreenProps from "../interface/ScreenProps"
import UseEventProps from "../interface/UseEventProps";
import EVENTS from "../util/inputs.json";

/**
 * Calcul the position from top, the height, the width, the position from left of a event
 * @param {ScreenProps} screen The screen height and width 
 * @param {EventProps} event The event start time, the duration and id
 * @returns {number} 
 * @todo Remove the event properties
 */
const useEvent = (screen: ScreenProps, event: EventProps): UseEventProps => {
  const { start, duration, id } = event

  /**
   * Extract, parse and return hours and minutes from string
   * @param {string} hourStr The hour  
   * @returns {HourProps} The hours and minutes of hourStr
   */
  const getHourFromString = useCallback((hourStr: string): HourProps => {
    const hours = parseInt(hourStr.substring(0, 2))
    const minutes = parseInt(hourStr.substring(3, 5))
    return { hours, minutes }
  }, [])


  /**
   * Calcul the end hour of a event
   * @param {string} start The start hour of a event
   * @param {number} duration The duration of a event in minute
   * @returns {string} The end hour of the event
   */
  const getEndEventHour = useCallback((start: string, duration: number): string => {
    const { hours, minutes } = getHourFromString(start)
    const totalMinutes = minutes + duration
    const numberOfHour = Math.floor(totalMinutes / 60)
    const totalHours = hours === 9 ? '09' : hours + numberOfHour
    const endHour = totalMinutes < 60 ? `${totalHours}:${totalMinutes}` : `${totalHours}:${totalMinutes - 60 * numberOfHour}`
    return endHour.length === 4 ? endHour.concat('0') : endHour
  }, [duration, getHourFromString])


  /**
   * Get all ovelaped events with the event
   * @param {EventProps[]} events The array of event
   * @returns {EventProps} The array of overlaped event
   */
  const getOverlapEvent = (events: EventProps[]): EventProps[] => {
    const currentEndHour = getEndEventHour(start, duration)
    const overlaps = events.filter((e: EventProps) => isOverlap(e, currentEndHour))
    console.log(overlaps, id);

    return overlaps.length === events.length ? overlaps : getOverlapEvent(overlaps)
  }

  /**
   * Check if the event has overlap
   * @param {EventProps} event The event from the list of event
   * @param {string} currentEndHour The end hour of a event
   * @returns {boolean} True or False
   */
  const isOverlap = (event: EventProps, currentEndHour: string): boolean => {
    const eventEndHour = getEndEventHour(event.start, event.duration)
    const hasStartOverlap = event.start <= start && start <= eventEndHour
    const hasEndOverlap = event.start <= currentEndHour && currentEndHour <= eventEndHour
    const isIdNotEqual = id !== event.id
    return (hasStartOverlap || hasEndOverlap) && isIdNotEqual
  }


  /**
   * Calcul the height of a event 
   * @returns {number} The height of a event
   */
  const height = useMemo((): number => {
    return ((screen.height / 12) * duration) / 60
  }, [screen.height, duration])


  /**
   * Calcul the width of a event
   * @returns {number} The width of a event
   */
  const width = useMemo(() => {
    const overlapEvents = getOverlapEvent(EVENTS)
    return overlapEvents.length ? screen.width : screen.width / 2;
    // eslint-disable-next-line
  }, [screen.width])


  /**
   * Calcul the starting position of a event
   * @returns The top position of a event
   */
  const positionTop = useMemo((): number => {
    const { hours, minutes } = getHourFromString(start)
    return (screen.height / 12) * ((hours - 9) + minutes / 60)
  }, [screen.height, start, getHourFromString])


  /**
  * Calcul the position from the left of a event
  * @returns The left position of a event
  */
  const positionLeft = useMemo(() => {
    const overlapEvents = getOverlapEvent(EVENTS)
    const sortOverlapEvent = overlapEvents.sort((a, b) => a.start.localeCompare(b.start))
    console.log(sortOverlapEvent);

    const event = sortOverlapEvent.find((overlapEvent) => overlapEvent.id === id);

    if (overlapEvents.length === 1 || !event) return 0
    const indexOfEvent = sortOverlapEvent.indexOf(event) + 1

    return indexOfEvent % 2 === 0 ? screen.width / 2 : 0
    // eslint-disable-next-line
  }, [screen.width, id, getOverlapEvent])


  /**
   * 
   */
  const position = useMemo((): PositionProps => {
    return {
      top: positionTop,
      left: positionLeft,
    }
  }, [positionTop, positionLeft])

  return {
    position,
    height,
    width,
  }
}

export default useEvent;