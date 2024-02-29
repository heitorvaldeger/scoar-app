import { atom } from "recoil";

export const modalPlaceListState = atom<boolean>({
  key: 'modal-place-list',
  default: false
})

export const modalPlaceCreateState = atom<boolean>({
  key: 'modal-place-create',
  default: false
})

export const modalProtocolListState = atom<boolean>({
  key: 'modal-protocol-list',
  default: false
})

export const modalProtocolCreateState = atom<boolean>({
  key: 'modal-protocol-create',
  default: false
})