import { EventBus } from "..";
abstract class AggregateRoot {
  async emit<IEvent extends Object>(event: IEvent) {
    await EventBus.dispatch<IEvent, void>(event);
  }
}

export default AggregateRoot;