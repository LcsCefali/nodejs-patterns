abstract class Strategy {
  public abstract execute(): boolean;
}

class DefaultBetaModules implements Strategy {
}

class TransferBetaModules implements Strategy {
}