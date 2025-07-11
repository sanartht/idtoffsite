
export enum Screen {
  Details = 'DETAILS',
  ShowFlow = 'SHOW_FLOW',
  Media = 'MEDIA',
}

export interface ScheduleItem {
  time: string;
  title: string;
  speaker: string;
  description: string;
}
