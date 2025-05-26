import { LitElement } from 'lit';

export class BaseComponent extends LitElement {
  protected logLifecycle(name: string) {
    console.log(`Lifecycle event: ${name}`);
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.logLifecycle('connected');
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.logLifecycle('disconnected');
  }
}
