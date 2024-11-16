import { Action } from "@shared/constants"

export type Permission = {
  isOwner: boolean
  isAdmin: boolean
  isMember: boolean
  isOutsider: boolean
  action: Action | null
}
