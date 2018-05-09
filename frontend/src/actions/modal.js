import {
  OPEN_MODAL,
  CLOSE_MODAL } from "./actionTypes";


export function openModal(id) {
  return {
    type: OPEN_MODAL,
    id
  }
}

export function closeModal() {
  return {
    type: CLOSE_MODAL
  }
}

