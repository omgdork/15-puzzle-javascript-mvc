export default class Event {
  constructor() {
    this.handlers = [];
  }

  subscribe(event, handler, context) {
    if (typeof context === 'undefined') {
      context = handler;
    }

    this.handlers.push({
      event,
      handler: handler.bind(context),
    });
  }

  publish(event, args) {
    this.handlers.forEach((item) => {
      if (item.event === event) {
        item.handler(args);
      }
    });
  }
}
