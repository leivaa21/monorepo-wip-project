class DuplicatedInjectableException extends Error {
  constructor(injectableTag: string) {
    super(`[ERROR] {DependencyInjection} Duplicated Injectable ${injectableTag} was registered!`)
  }
}

export default DuplicatedInjectableException;