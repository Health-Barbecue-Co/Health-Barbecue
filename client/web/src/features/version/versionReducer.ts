import { SET_VERSION, UNSET_VERSION } from './actionTypes'
import { VersionActionTypes } from './types'
import { IVersion } from '../../models/version'

const initialState: IVersion | null = null

export default (state = initialState, action: VersionActionTypes) => {
  switch (action.type) {
    case SET_VERSION:
      return action.version
    case UNSET_VERSION:
      return null
    default:
      return state
  }
}
