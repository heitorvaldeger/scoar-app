import { Device } from "@/interfaces/Device";
import { devicesState } from "@/store/devices";
import { useRecoilValue } from "recoil";

export const useDevice = () => {
  const devices = useRecoilValue<Device[]>(devicesState);
  
  return {
    devices
  }
}