import { QueryBus } from "..";
import Injector from "../../dependencyInjection/Injector.entity";
import { Constructor } from "../../types";
import { QueryHandlerOptions } from "./QueryHandlerOptions";
import { IQueryHandler } from "./IQueryHandler";

export default function QueryHandler(options: QueryHandlerOptions) {
  return (constructor: Constructor<IQueryHandler<Object>>) => {
    let { Query, deps } = options;
    if (deps === undefined) deps = [];
    const buildedDependencies =
      deps.map(dependency => Injector.getInstance().buildInjectable(dependency.name));
    
    QueryBus.subscribe(Query, new constructor(...buildedDependencies));
  }
}