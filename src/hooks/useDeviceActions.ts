import { Device } from "@/interfaces/Entities/Device";
import { devicesState } from "@/store/devices";
import { useSetRecoilState } from "recoil";

export const useDeviceActions = (device: Device) => {
  const setDevices = useSetRecoilState(devicesState);
  const sincTemp = device.sinc_temp ? new Date(device.sinc_temp * 1000).toLocaleString() : '';

  const onUpdateStatus = (deviceId: string) => {
    setDevices((prevState) => {
      return prevState.map(device => {
        if (device.code === deviceId) {
          return {
            ...device,
            status: !device.status
          }
        }

        return device;
      });
    })
  }

  const onUpdateTemperature = (deviceId: string, temperature: number) => {
    setDevices((prevState) => {
      return prevState.map(device => {
        if (device.code === deviceId) {
          return {
            ...device,
            temperature
          }
        }

        return device;
      });
    })
  }

  return {
    onUpdateStatus,
    onUpdateTemperature,
    sincTemp
  }
}