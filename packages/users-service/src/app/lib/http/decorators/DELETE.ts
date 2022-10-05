import {Server} from "../server";
import { Constructor } from "../../types";
import HttpController from "../HttpController";
import { RouteOptions } from "./helpers/routeOptions";
import { formatOptions } from "./helpers/formatOptions";


export default function DELETE(options: RouteOptions = {}) {
  return (constructor: Constructor<HttpController>) => {
    const { router, path, buildedDependencies } = formatOptions(options);
    Server.registerEndpoint(router, path, "DELETE", new constructor(...buildedDependencies));
  };
}