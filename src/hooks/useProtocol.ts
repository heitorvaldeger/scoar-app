import { Protocol } from "@/interfaces/Protocol";
import { protocolsState } from "@/store/protocols";
import { useRecoilState } from "recoil";

export const useProtocol = () => {
  const [protocols, setProtocols] = useRecoilState<Protocol[]>(protocolsState);

  return {
    protocols,
    setProtocols
  }
}