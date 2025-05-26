# Framework Documentation

## Description

This counter is a lightweight, modern UI component framework built on top of Lit Elements. The framework includes a robust base component system, theming capabilities, and ready-to-use UI elements like the interactive counter component.

Key features:
- **Lightweight**: Minimal dependencies and optimized performance
- **Customizable**: Extensive theming and styling options
- **Type-safe**: Built with TypeScript for robust development

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Basic Installation

```bash
# Create a new directory for your project
mkdir counter-app
cd counter-app

# Initialize a new npm project
npm init -y

# Install dependencies
npm install lit lit-element lit-html typescript

# Install LitCounter framework
npm install litcounter-framework
```

### Project Structure

After installation, set up your project with the following recommended structure:

```
counter-app/
├── node_modules/
├── src/
│   ├── components/
│   │   └── MyCustomCounter.ts    # Your custom components
│   ├── framework/
│   │   └── BaseComponent.ts      # Base component from the framework
│   ├── styles/
│   │   └── themes.ts             # Theme definitions
│   ├── index.html
│   └── main.ts
├── package.json
└── tsconfig.json
```

### TypeScript Configuration

Create a `tsconfig.json` file with the following configuration:

```json
{
  "compilerOptions": {
    "target": "es2019",
    "module": "es2020",
    "moduleResolution": "node",
    "lib": ["es2020", "DOM", "DOM.Iterable"],
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "inlineSources": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitAny": true,
    "experimentalDecorators": true,
    "useDefineForClassFields": false
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## Usage

### Basic Usage

1. **Import the components in your main entry point:**

```typescript
// main.ts
import './components/MyCounter';

document.body.innerHTML = `
  <h1>LitCounter Example</h1>
  <my-counter initial="5"></my-counter>
`;
```

2. **Create an HTML file to load your application:**

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LitCounter Example</title>
  <script type="module" src="./dist/main.js"></script>
</head>
<body>
  <!-- Content will be added by main.ts -->
</body>
</html>
```

### Advanced Usage

Create multiple counter instances with different configurations:

```typescript
// main.ts
import './components/MyCounter';
import { css } from 'lit';

// Add global styles
const globalStyles = css`
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #f5f7fa;
  }
`;

// Create and append styles
const styleElement = document.createElement('style');
styleElement.textContent = globalStyles.toString();
document.head.appendChild(styleElement);

// Create page content
document.body.innerHTML = `
  <h1>Counter Examples</h1>
  
  <div style="display: flex; gap: 20px;">
    <my-counter initial="5" min="0" max="10" theme="blue"></my-counter>
    <my-counter initial="50" min="0" max="100" step="5" theme="green"></my-counter>
    <my-counter initial="0" min="-10" max="10" step="2" theme="purple"></my-counter>
  </div>
`;
```

## Components

### BaseComponent

The `BaseComponent` is the foundation of all components in the LitCounter framework. It extends Lit's `LitElement` and provides common functionality for lifecycle management and logging.

#### Usage

```typescript
import { BaseComponent } from '../framework/BaseComponent';

export class MyCustomComponent extends BaseComponent {
  // Your component implementation
}
```

### MyCounter Component

The `MyCounter` component is an interactive, themeable counter with various customization options.

#### Parameters

| Property | Type   | Default               | Description                           |
|----------|--------|------------------------|---------------------------------------|
| initial  | Number | 0                      | Initial counter value                 |
| min      | Number | Number.MIN_SAFE_INTEGER | Minimum allowed value                 |
| max      | Number | Number.MAX_SAFE_INTEGER | Maximum allowed value                 |
| step     | Number | 1                      | Increment/decrement step size         |
| theme    | String | 'blue'                 | Color theme ('blue', 'green', 'purple') |

#### Example

```html
<my-counter 
  initial="10"
  min="0"
  max="100"
  step="5"
  theme="purple">
</my-counter>
```

## Theming

The framework supports three built-in themes:
- `blue`: Professional, calm appearance
- `green`: Fresh, positive appearance
- `purple`: Creative, bold appearance

You can also create custom themes by extending the CSS variables in your component:

```typescript
static styles = css`
  .theme-custom {
    --primary-color: #ff5722;
    --primary-hover: #e64a19;
    --value-color: #5d4037;
  }
`;
```

## Technologies Used
 - TypeScript
 - HTML & CSS
 - Node.js
