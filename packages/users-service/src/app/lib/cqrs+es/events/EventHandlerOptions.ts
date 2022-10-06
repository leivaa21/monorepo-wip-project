import { InjectableObject } from "../../dependencyInjection/Injector.entity"
import { Constructor } from "../../types"

export type EventHandlerOptions = {
  Event: Constructor<Object>,
  deps?: Constructor<InjectableObject>[] 
}