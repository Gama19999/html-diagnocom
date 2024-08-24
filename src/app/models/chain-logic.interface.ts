
export interface ChainLogic {
  doForwardChain(data: any): void;

  storeFact(fact: any): void;
}
