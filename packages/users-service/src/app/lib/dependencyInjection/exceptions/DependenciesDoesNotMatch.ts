class DependenicesDoesNotMatchException extends Error {
  constructor(injectableTag: string) {
    super(`[ERROR] {DependencyInjection} Failed to inject ${injectableTag}. Dependencies doesnt not match in decorator and constructor!`)
  }
}

export default DependenicesDoesNotMatchException;