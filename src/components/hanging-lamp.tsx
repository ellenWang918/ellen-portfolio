import { Pendant, type PendantProps } from "./Pendant/Pendant";

export type PendentState = "off" | "on";
export type PendentProps = PendantProps;

export function HangingLamp(props: PendentProps = {}) { return <Pendant {...props} />; }
export function Pendent(props: PendentProps = {}) { return <Pendant {...props} />; }
