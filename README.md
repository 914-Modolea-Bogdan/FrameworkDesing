# LitComponent Framework Documentation

## Description

LitComponent is a lightweight, performance-focused web component framework built on top of the Lit library. It provides a simplified approach to creating reusable, reactive UI elements with a clean, declarative syntax. The framework emphasizes type safety through TypeScript integration, consistent component lifecycle management, and an intuitive development experience.

Key features:
- **Web Component Standard**: Built on the native Web Components specifications
- **Reactive Properties**: Automatically updates the UI when component properties change
- **TypeScript Support**: Full type safety with decorator-based API
- **Lightweight**: Minimal runtime overhead compared to larger frameworks
- **Shadow DOM**: Components are encapsulated to prevent style and DOM collisions
- **Lifecycle Management**: Consistent component lifecycle hooks with built-in logging
- **Theme Support**: Easy theming capabilities with CSS variables

## Installation

### Prerequisites
- Node.js 14+ and npm 6+
- TypeScript 4.5+

### Setup New Project

1. **Create a new project directory**:
```bash
mkdir my-lit-project
cd my-lit-project
```

2. **Initialize npm project**:
```bash
npm init -y
```

3. **Install required dependencies**:
```bash
npm install lit typescript
npm install --save-dev vite @types/node
```

4. **Project structure**:

Create a basic folder structure:
```
my-lit-project/
├── src/
│   ├── framework/
│   │   └── BaseComponent.ts
│   ├── components/
│   │   └── MyCounter.ts
│   └── main.ts
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.js
```

Then run:
```bash
npm run dev
```

## Usage


### Using the Counter Component

The framework includes a pre-built counter component with rich features:

```typescript
import './components/MyCounter';

// Use the counter component in your HTML
document.body.innerHTML = `
  <my-counter 
    initial="5" 
    min="0" 
    max="100" 
    step="5"
    theme="blue">
  </my-counter>
`;
```

### Component Parameters

The `MyCounter` component accepts the following parameters:

| Parameter | Type   | Default             | Description                                        |
|-----------|--------|---------------------|----------------------------------------------------|
| `initial` | Number | `0`                 | Starting value of the counter                      |
| `min`     | Number | `MIN_SAFE_INTEGER`  | Minimum allowed value (can be negative)            |
| `max`     | Number | `MAX_SAFE_INTEGER`  | Maximum allowed value                              |
| `step`    | Number | `1`                 | Increment/decrement step size                      |
| `theme`   | String | `'blue'`            | Color theme (`'blue'`, `'green'`, or `'purple'`)   |

### Lifecycle Hooks

The framework provides these lifecycle hooks:

- `connectedCallback`: Called when the component is added to the DOM
- `disconnectedCallback`: Called when the component is removed from the DOM
- `willUpdate`: Called before the component updates

Example usage:
```typescript
connectedCallback(): void {
  super.connectedCallback();
  // Your initialization code here
}

willUpdate(changedProperties) {
  super.willUpdate(changedProperties);
  // Called before update
}
```

### Theme System

The component uses CSS variables for theming:

```typescript
static styles = css`
  .theme-blue {
    --primary-color: #3498db;
    --primary-hover: #2980b9;
    --value-color: #2c3e50;
  }
`;
```

You can define multiple themes and switch between them by changing the `theme` property.

## Advanced Usage

### State Management

Use `@state()` for internal component state:

```typescript
import { state } from 'lit/decorators.js';

@state() private count: number = 0;
```

State properties trigger renders when changed but aren't exposed as attributes.

### Event Handling

```typescript
private handleClick() {
  this.count++;
  this.dispatchEvent(new CustomEvent('count-changed', { 
    detail: { count: this.count },
    bubbles: true 
  }));
}

render() {
  return html`<button @click=${this.handleClick}>Click Me</button>`;
}
```

### Using Slots for Composition

```typescript
render() {
  return html`
    <div class="card">
      <div class="header">
        <slot name="header">Default Header</slot>
      </div>
      <div class="content">
        <slot>Default content</slot>
      </div>
    </div>
  `;
}
```

Usage:
```html
<my-card>
  <span slot="header">Custom Header</span>
  <p>This is the main content</p>
</my-card>
```

## About the Code

The framework is built on these core principles:

### Component-Based Architecture

Each UI element is a self-contained component with its own markup, styles, and behavior, promoting reusability and maintainability.

### Reactivity

The framework uses Lit's reactive properties system to automatically update the UI when data changes, eliminating the need for manual DOM manipulation.

### Type Safety

TypeScript integration ensures type safety during development, catching potential errors early.

### Performance

- Components only re-render when their properties change
- Shadow DOM encapsulation prevents style conflicts
- Efficient template rendering with lit-html

### Web Standards

Built entirely on web standards:
- Custom Elements v1
- Shadow DOM v1
- HTML Templates
- ES Modules

### Decorator Pattern

Uses TypeScript decorators to create a clean, declarative API:
- `@customElement()`: Registers the component
- `@property()`: Defines reactive properties
- `@state()`: Manages internal state

## Best Practices

1. **Keep components focused**: Each component should do one thing well
2. **Separate concerns**: Divide logic, presentation, and styles
3. **Use TypeScript**: Leverage strong typing for safer code
4. **Don't manipulate the DOM directly**: Use Lit's template system
5. **Avoid deeply nested components**: Prefer flat component hierarchies
6. **Test your components**: Write unit tests for business logic
7. **Document your components**: Include JSDoc comments for API clarity
