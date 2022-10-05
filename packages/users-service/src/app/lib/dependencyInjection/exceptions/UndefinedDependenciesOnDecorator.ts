class UndefinedDependenciesOnDecoratorException extends Error {
  constructor(injectableTag: string) {
    super(`[ERROR] {DependencyInjection} Failed to inject ${injectableTag}. Dependencies missing in decorator!`)
  }
}

export default UndefinedDependenciesOnDecoratorException;