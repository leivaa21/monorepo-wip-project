import BaseHandler from "../core/BaseHandler";

export interface IEventHandler<Event> extends BaseHandler<Event, void> {}
