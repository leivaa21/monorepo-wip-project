import { EventBus } from "..";
import { Event } from '../events/Event';
abstract class AggregateRoot {
  async emit<IEvent extends Event>(event: IEvent) {
    await EventBus.dispatch<IEvent, void>(event);
  }
}

export default AggregateRoot;