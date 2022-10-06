import { CommandBus } from "..";
import Injector from "../../dependencyInjection/Injector.entity";
import { Constructor } from "../../types";
import { CommandHandlerOptions } from "./CommandHandlerOptions";
import { ICommandHandler } from "./ICommandHandler";

export default function CommandHandler(options: CommandHandlerOptions) {
  return (constructor: Constructor<ICommandHandler<Object>>) => {
    let { Command, deps } = options;
    if (deps === undefined) deps = [];
    const buildedDependencies =
      deps.map(dependency => Injector.getInstance().buildInjectable(dependency.name));
    
    CommandBus.subscribe(Command, new constructor(...buildedDependencies));
  }
}