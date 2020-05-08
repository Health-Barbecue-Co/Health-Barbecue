import { ILabelizable } from "./ILabelizable";

export interface ISeries extends ILabelizable{
  id: string
  seriesInstanceUID: string
  seriesDescription: string
  modality: string
  numberOfSeriesRelatedInstances: string
  patientsName: string
  bodyPartExamined: string
}
