import BaseHandler from "../core/BaseHandler";
import { Event } from "./Event";

export interface IEventHandler extends BaseHandler<Event, void> {}
