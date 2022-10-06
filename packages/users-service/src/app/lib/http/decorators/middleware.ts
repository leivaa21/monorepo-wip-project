import {Server} from "../server";
import { MiddlewareOptions } from "./helpers/middlewareOptions";
import { Constructor } from "../../types";
import HttpMiddleware from "../HttpMiddleware";


export default function Middleware(options: MiddlewareOptions = {}) {
  return (constructor: Constructor<HttpMiddleware>) => {
    let { router } = options;
    if (router === undefined) {
      router = '/';
    }
    Server.registerMiddleware(router, new constructor().execute);
  };
}