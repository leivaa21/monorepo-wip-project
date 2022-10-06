import { ICommandHandler } from "./commands/ICommandHandler";
import BaseBus from "./core/BaseBus";
import { IEventHandler } from "./events/IEventHandler";
import { IQueryHandler } from "./queries/IQueryHandler";
import AggregateRoot from "./core/AggregateRoot";
import CommandHandler from "./commands/CommandHandler.decorator";
import QueryHandler from "./queries/QueryHandler.decorator";
import EventHandler from "./events/EventHandler.decorator";

class CQRSModule {
  private static instance?: CQRSModule = undefined;
  public readonly CommandBus = new BaseBus<Object, ICommandHandler<Object>>()
  public readonly EventBus = new BaseBus<Object, IEventHandler<Object>>()
  public readonly QueryBus = new BaseBus<Object, IQueryHandler<Object>>()
  private constructor() { }
  public static getInstance() {
    if (this.instance === undefined) {
      this.instance = new this();
    }
    return this.instance;
  }
}

const { CommandBus, EventBus, QueryBus } = CQRSModule.getInstance();
export { CommandBus, EventBus, QueryBus, AggregateRoot, ICommandHandler, IQueryHandler, IEventHandler, CommandHandler, QueryHandler, EventHandler};
