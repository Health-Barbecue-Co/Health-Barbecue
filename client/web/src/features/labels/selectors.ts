import { LabelsState } from './types'

export function getLabelStore(globalStore: any): LabelsState {
    return globalStore.labels;
}
