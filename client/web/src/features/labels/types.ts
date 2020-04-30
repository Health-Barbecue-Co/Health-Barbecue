import { ILabel } from '../../models/ILabel'
import { 
  SET_ALL_LABELS,
  POST_LABEL
} from './actionTypes'


interface SetAllLabelsAction {
  type: typeof SET_ALL_LABELS
  labelsList: ILabel[]
}

export interface PostLabelsAction {
  type: typeof POST_LABEL
  label: ILabel
}

export type LabelsActionTypes =
  | SetAllLabelsAction
  | PostLabelsAction

export interface LabelsState {
  labelsList: ILabel[]
}
