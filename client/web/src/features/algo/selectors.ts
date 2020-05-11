import { AlgoState } from './types'

export function getAlgoStore(globalStore: any): AlgoState {
  return globalStore.algo
}
