import { html, css, PropertyValueMap } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { BaseComponent } from '../framework/BaseComponent';

@customElement('my-counter')
export class MyCounter extends BaseComponent {
  @property({ type: Number }) initial = 0;
  @property({ type: Number }) min = Number.MIN_SAFE_INTEGER;
  @property({ type: Number }) max = Number.MAX_SAFE_INTEGER;
  @property({ type: Number }) step = 1;
  @property({ type: String }) theme = 'blue';
  
  @state() private count: number = 0;
  @state() private animateValue: boolean = false;

  static styles = css`
    .counter-container {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      padding: 2rem;
      width: 300px;
      text-align: center;
      transition: all 0.3s ease;
    }

    .theme-blue {
      --primary-color: #3498db;
      --primary-hover: #2980b9;
      --value-color: #2c3e50;
    }

    .theme-green {
      --primary-color: #2ecc71;
      --primary-hover: #27ae60;
      --value-color: #1e3f29;
    }

    .theme-purple {
      --primary-color: #9b59b6;
      --primary-hover: #8e44ad;
      --value-color: #4a235a;
    }

    h2 {
      color: #333;
      font-weight: 300;
      margin-top: 0;
    }

    .value-display {
      position: relative;
      font-size: 3.5rem;
      font-weight: 700;
      color: var(--value-color);
      margin: 1.5rem 0;
      transition: all 0.2s ease;
      user-select: none;
    }

    .value-animate {
      animation: pulse 0.5s ease;
    }

    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.1); }
      100% { transform: scale(1); }
    }

    .controls {
      display: flex;
      justify-content: center;
      gap: 0.75rem;
    }

    button {
      background-color: var(--primary-color);
      color: white;
      border: none;
      border-radius: 8px;
      padding: 0.75rem 1.5rem;
      font-size: 1.2rem;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    button:hover {
      background-color: var(--primary-hover);
      transform: translateY(-2px);
    }

    button:active {
      transform: translateY(0);
    }

    .counter-input {
      margin-top: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    input {
      width: 80px;
      text-align: center;
      font-size: 1.1rem;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    .info-text {
      margin-top: 1rem;
      font-size: 0.85rem;
      color: #7f8c8d;
    }

    .min-max-display {
      display: flex;
      justify-content: space-between;
      margin-top: 0.5rem;
      font-size: 0.8rem;
      color: #95a5a6;
    }
  `;

  connectedCallback(): void {
    super.connectedCallback();
    this.count = this.initial;
  }

  private increment() {
    if (this.count + this.step <= this.max) {
      this.count += this.step;
      this.animateValue = true;
      setTimeout(() => {
        this.animateValue = false;
      }, 500);
    }
  }

  private decrement() {
    if (this.count - this.step >= this.min) {
      this.count -= this.step;
      this.animateValue = true;
      setTimeout(() => {
        this.animateValue = false;
      }, 500);
    }
  }

  private updateValue(e: Event) {
    const input = e.target as HTMLInputElement;
    const newValue = parseInt(input.value, 10);
    
    if (!isNaN(newValue)) {
      if (newValue >= this.min && newValue <= this.max) {
        this.count = newValue;
      } else if (newValue < this.min) {
        this.count = this.min;
      } else {
        this.count = this.max;
      }
    }
  }

  private reset() {
    this.count = this.initial;
    this.animateValue = true;
    setTimeout(() => {
      this.animateValue = false;
    }, 500);
  }

  override willUpdate(changed: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    super.logLifecycle('willUpdate');
  }

  protected override render() {
    return html`
      <div class="counter-container theme-${this.theme}">
        <h2>Interactive Counter</h2>
        
        <div class="value-display ${this.animateValue ? 'value-animate' : ''}">
          ${this.count}
        </div>
        
        <div class="controls">
          <button @click=${this.decrement} ?disabled=${this.count <= this.min}>-</button>
          <button @click=${this.reset}>Reset</button>
          <button @click=${this.increment} ?disabled=${this.count >= this.max}>+</button>
        </div>
        
        <div class="counter-input">
          <input 
            type="number" 
            .value=${this.count} 
            @change=${this.updateValue}
            min=${this.min}
            max=${this.max}
            step=${this.step}
          />
        </div>
        
        <div class="min-max-display">
          <span>Min: ${this.min !== Number.MIN_SAFE_INTEGER ? this.min : 'None'}</span>
          <span>Max: ${this.max !== Number.MAX_SAFE_INTEGER ? this.max : 'None'}</span>
        </div>
        
        <p class="info-text">Step size: ${this.step}</p>
      </div>
    `;
  }
}