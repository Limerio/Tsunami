export const withCredentials = {
  withCredentials: true,
}

export const portsQueue = 'ports_queue'

export enum EventsPattern {
  ScanCreated = 'scan_create',
}

export enum EventsWs {
  ScanInProgress = 'scan.progress',
  ScanFinish = 'scan.finish',
}
