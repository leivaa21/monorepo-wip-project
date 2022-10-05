class InjectableNotFoundException extends Error {
  constructor(injectableTag: string) {
    super(`[ERROR] {DependencyInjection} Injectable ${injectableTag} was not found in build time!`)
  }
}

export default InjectableNotFoundException;