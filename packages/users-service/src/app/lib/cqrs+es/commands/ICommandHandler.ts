import BaseHandler from "../core/BaseHandler";

export interface ICommandHandler<Command> extends BaseHandler<Command, void>{}
