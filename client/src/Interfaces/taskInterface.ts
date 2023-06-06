import type { User } from "./userInterface";

export interface Task {
    info: string,
    startHour: object | string,
    endHour: object | string,
    done: boolean,
    user?: User | null
  }