import { Command } from "./commands/Command";
import { ICommandHandler } from "./commands/ICommandHandler";
import BaseBus from "./core/BaseBus";
import { Event } from "./events/Event";
import { IEventHandler } from "./events/IEventHandler";
import { IQueryHandler } from "./queries/IQueryHandler";
import { Query } from "./queries/Query";
import AggregateRoot from "./core/AggregateRoot";
import CommandHandler from "./commands/CommandHandler.decorator";
import QueryHandler from "./queries/QueryHandler.decorator";
import EventHandler from "./events/EventHandler.decorator";

class CQRSModule {
  private static instance?: CQRSModule = undefined;
  public readonly CommandBus = new BaseBus<Command, ICommandHandler>()
  public readonly EventBus = new BaseBus<Event, IEventHandler>()
  public readonly QueryBus = new BaseBus<Query, IQueryHandler>()
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
