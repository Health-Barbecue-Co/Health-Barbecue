import { UNSET_VERSION, SET_VERSION } from './actionTypes'
import { IVersion } from '../../models/version'

interface UnsetVersionAction {
  type: typeof UNSET_VERSION
}

interface SetVersionAction {
  type: typeof SET_VERSION
  version: IVersion
}

export type VersionActionTypes = SetVersionAction | UnsetVersionAction
