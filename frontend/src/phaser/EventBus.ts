
// Use a lightweight event emitter when running in SSR to avoid window access.
type Listener = (...args: any[]) => void;
class SimpleEmitter {
  private listeners = new Map<string, Set<Listener>>();
  on(event: string, cb: Listener) {
    if (!this.listeners.has(event)) this.listeners.set(event, new Set());
    this.listeners.get(event)!.add(cb);
  }
  off(event: string, cb: Listener) {
    this.listeners.get(event)?.delete(cb);
  }
  emit(event: string, ...args: any[]) {
    this.listeners.get(event)?.forEach((cb) => cb(...args));
  }
}

let EventBus: Phaser.Events.EventEmitter | SimpleEmitter;

if (typeof window === 'undefined') {
  EventBus = new SimpleEmitter();
} else {
  // Dynamically import to keep Phaser off the server bundle.
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const Phaser = require('phaser') as typeof import('phaser');
  EventBus = new Phaser.Events.EventEmitter();
}

// Used to emit events between components, HTML and Phaser scenes
export { EventBus };
