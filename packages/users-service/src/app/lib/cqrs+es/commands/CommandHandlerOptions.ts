import { InjectableObject } from "../../dependencyInjection/Injector.entity"
import { Constructor } from "../../types"
import { Command } from "./Command"

export type CommandHandlerOptions = {
  Command: Constructor<Command>,
  deps?: Constructor<InjectableObject>[] 
}