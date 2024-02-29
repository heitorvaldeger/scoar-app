import { Device } from "@/interfaces/Device";
import { atom } from "recoil";

export const devicesState = atom<Device[]>({
  key: 'devices-list',
  default: [
    {
      code: 'device-1',
      place: 'Sala',
      protocol: 1,
      status: false,
      temperature: 25,
      sinc_temp: 1633141200
    },
    {
      code: 'device-2',
      place: 'Quarto',
      protocol: 1,
      status: false,
      temperature: 22,
      sinc_temp: 1633141200
    },
    {
      code: 'device-3',
      place: 'Cozinha',
      protocol: 1,
      status: false,
      temperature: 20,
      sinc_temp: 1633141200
    },
    {
      code: 'device-4',
      place: 'Banheiro',
      protocol: 1,
      status: false,
      temperature: 18,
      sinc_temp: 1633141200
    },
    {
      code: 'device-5',
      place: 'Escritório',
      protocol: 1,
      status: false,
      temperature: 24,
      sinc_temp: 1633141200
    },
    {
      code: 'device-6',
      place: 'Garagem',
      protocol: 1,
      status: false,
      temperature: 26,
      sinc_temp: 1633141200
    },
    {
      code: 'device-7',
      place: 'Área de serviço',
      protocol: 1,
      status: false,
      temperature: 23,
      sinc_temp: 1633141200
    },
    {
      code: 'device-8',
      place: 'Varanda',
      protocol: 1,
      status: false,
      temperature: 21,
      sinc_temp: 1633141200
    }
  ]
})