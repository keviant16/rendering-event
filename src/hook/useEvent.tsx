import { useCallback, useEffect, useMemo, useState } from "react"
import EventProps from "../interface/EventProps";
import HourProps from "../interface/HourProps";
import ScreenProps from "../interface/ScreenProps"
import EVENTS from "../util/inputs.json";


/**
 * Custom hook to ...
 * @param screen 
 * @param event 
 * @returns position, height ... of a event
 */
const useEvent = (screen: ScreenProps, event: EventProps) => {
  const { start, duration, id } = event

  /**
   * Get minutes and hours as number
   * @returns hours, minutes
   */
  const getEventHour = useCallback((start: string): HourProps => {
    const hours = parseInt(start.substring(0, 2))
    const minutes = parseInt(start.substring(3, 5))
    return { hours, minutes }
  }, [])

  /**
   * Get event end hour as string 
   */
  const getEndEventHour = useCallback((start: string): string => {
    const { hours, minutes } = getEventHour(start)
    const sum = minutes + duration
    const hourNumber = Math.floor(sum / 60)
    return sum < 60 ? `${hours === 9 ? '09' : hours}:${sum}` : `${hours === 9 ? '09' : hours + hourNumber}:00`
  }, [duration, getEventHour])

  /**
   * Get ovelaped event 
   */
  const getOverlapEvent = (events: any[]): any[] => {
    const end = getEndEventHour(start)

    const overlaps = events.filter((event: any) => {
      const eventEndHour = getEndEventHour(event.start)
      const hasStartOverlap = event.start <= start && start <= eventEndHour
      const hasEndOverlap = event.start <= end && end <= eventEndHour
      return hasStartOverlap || hasEndOverlap
    })

    return overlaps.length === events.length ? overlaps : getOverlapEvent(overlaps)
  }

  /**
   * Calcul the starting position of a event in pixel
   */
  const positionTop = useMemo((): number => {
    const { hours, minutes } = getEventHour(start)
    return (screen.height / 12) * ((hours - 9) + minutes / 60)
  }, [screen.height, start, getEventHour])

  /**
   * Calcul the height of a event in pixel
   */
  const height = useMemo((): number => {
    return ((screen.height / 12) * duration) / 60
  }, [screen.height, duration])

  /**
   * Calcul the width of a event in pixel
   */
  const width = useMemo(() => {
    const overlapEvents = getOverlapEvent(EVENTS)
    console.log({ id, overlapEvents });

    return overlapEvents.length === 1 ? screen.width : screen.width / 2;
  }, [getEndEventHour, screen.width])

  const positionLeft = useMemo(() => {
    const overlapEvents = getOverlapEvent(EVENTS)
    if (overlapEvents.length === 1) return 0

    const sortOverlapEvent = overlapEvents.sort((a, b) => a.start - b.start)
    const event = sortOverlapEvent.find((overlapEvent) => overlapEvent.id === id);
    const indexOfEvent = sortOverlapEvent.indexOf(event) + 1

    return indexOfEvent % 2 === 0 ? screen.width / 2 : 0
  }, [getEndEventHour, screen.width])
  return {
    positionTop,
    height,
    width,
    positionLeft
  }
}

export default useEvent;