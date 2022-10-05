import {Server} from "../server";
import { Constructor } from "../../types";
import HttpController from "../HttpController";
import { RouteOptions } from "./helpers/routeOptions";
import { formatOptions } from "./helpers/formatOptions";


export default function POST(options: RouteOptions = {}) {
  return (constructor: Constructor<HttpController>) => {
    const { router, path, buildedDependencies } = formatOptions(options);
    Server.registerEndpoint(router, path, "POST", new constructor(...buildedDependencies));
  };
}