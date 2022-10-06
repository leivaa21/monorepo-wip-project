import Injector from "../../../dependencyInjection/Injector.entity";
import { RouteOptions } from "./routeOptions";

export function formatOptions(options: RouteOptions ) {
   let { router, path, deps} = options;

    // Avoid undefineds!
    if (router === undefined) {
      router = ''
    }
    if (path === undefined) {
      path = '/'
    }
    if (deps === undefined) {
      deps = []
    }

    // Format paths!
    if (!router.startsWith('/')) {
      router = `/${router}`
    }

    if (path.startsWith('/')) {
      path = path.slice(1)
    }

    if (path.endsWith('/') && path.length !== 1) {
      path = path.slice(0, path.length - 1);
    }
    
    const buildedDependencies = deps.map(dependency => 
      Injector.getInstance().buildInjectable(dependency.name)
    );
  

  return { router, path, buildedDependencies };
}