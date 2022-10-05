export default interface BaseHandler<Subscriptable, Response> {
  handle(subscriptable: Subscriptable): Promise<Response> | Response;
}