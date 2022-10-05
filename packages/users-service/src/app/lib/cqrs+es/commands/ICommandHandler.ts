import BaseHandler from "../core/BaseHandler";
import { Command } from "./Command";

export interface ICommandHandler extends BaseHandler<Command, void>{}
