import { InjectableObject } from "../../dependencyInjection/Injector.entity"
import { Constructor } from "../../types"
import { Event } from "./Event"

export type EventHandlerOptions = {
  Event: Constructor<Event>,
  deps?: Constructor<InjectableObject>[] 
}