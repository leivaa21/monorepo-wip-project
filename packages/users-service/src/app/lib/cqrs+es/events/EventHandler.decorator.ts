import { EventBus } from "..";
import Injector from "../../dependencyInjection/Injector.entity";
import { Constructor } from "../../types";
import { EventHandlerOptions } from "./EventHandlerOptions";
import { IEventHandler } from "./IEventHandler";

export default function EventHandler(options: EventHandlerOptions) {
  return (constructor: Constructor<IEventHandler<Object>>) => {
    let { Event, deps } = options;
    if (deps === undefined) deps = [];
    const buildedDependencies =
      deps.map(dependency => Injector.getInstance().buildInjectable(dependency.name));
    
    EventBus.subscribe(Event, new constructor(...buildedDependencies));
  }
}