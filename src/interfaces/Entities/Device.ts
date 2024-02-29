export interface Device {
  code: string;
  place: string;
  protocol: number;
  status: boolean;
  temperature: number;
  sinc_temp?: number;
}