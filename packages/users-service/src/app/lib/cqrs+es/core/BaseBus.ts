import { Constructor } from "../../types";
import BaseHandler from "./BaseHandler";

class BaseBus<SubscriptableType extends Object, HandlerType extends BaseHandler<SubscriptableType, unknown>> {
  private _subscriptions = new Map<string, HandlerType>()

  subscribe(subscriptable: Constructor<SubscriptableType>, handler: HandlerType) {
    const isAlreadySubscribed = this._subscriptions.has(subscriptable.name);
    if (isAlreadySubscribed) {
      const registeredHandler = this._subscriptions.get(subscriptable.name);
      throw new Error(`${subscriptable.name} has duplicated handlers [${handler.constructor.name} || ${(registeredHandler as HandlerType).constructor.name}]`)
    }
    this._subscriptions.set(subscriptable.name, handler);
  }
  async dispatch<Subscriptable extends SubscriptableType, Response>(subscriptable: Subscriptable): Promise<Response> {
    const isAlreadySubscribed = this._subscriptions.has(subscriptable.constructor.name);
    if (!isAlreadySubscribed) {
      throw new Error(`${subscriptable.constructor.name} has no registered handlers`);
    }
    const handler = this._subscriptions.get(subscriptable.constructor.name) as HandlerType;
    return (await handler.handle(subscriptable) as Response);
  }

}


export default BaseBus;