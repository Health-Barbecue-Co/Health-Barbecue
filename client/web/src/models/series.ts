import { ILabel } from "./ILabel"

export interface ISeries {
  id: string
  seriesInstanceUID: string
  seriesDescription: string
  modality: string
  numberOfSeriesRelatedInstances: string
  patientsName: string
  bodyPartExamined: string
  labels: Array<ILabel>
}
