import './components/MyCounter';
import { css } from 'lit';

// Add global styles
const globalStyles = css`
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    margin: 0;
    padding: 2rem;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h1 {
    color: #2c3e50;
    font-weight: 300;
    margin-bottom: 2rem;
    text-align: center;
  }

  .counters-container {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: center;
    max-width: 1200px;
  }

  .counter-card {
    margin-bottom: 1rem;
  }

  .theme-selector {
    margin: 2rem 0;
    display: flex;
    gap: 1rem;
    justify-content: center;
  }

  .theme-btn {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s ease;
  }

  .theme-btn.blue {
    background-color: #3498db;
    color: white;
  }

  .theme-btn.green {
    background-color: #2ecc71;
    color: white;
  }

  .theme-btn.purple {
    background-color: #9b59b6;
    color: white;
  }

  .theme-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }

  footer {
    margin-top: 3rem;
    text-align: center;
    color: #7f8c8d;
    font-size: 0.9rem;
  }
`;

// Create and append styles
const styleElement = document.createElement('style');
styleElement.textContent = globalStyles.toString();
document.head.appendChild(styleElement);

// Create page content
document.body.innerHTML = `
  <h1>Framework Desing - 2025</h1>
  

  
  <div class="counters-container">
    <div class="counter-card">
      <my-counter initial="5" min="0" max="10" step="1" theme="blue"></my-counter>
    </div>
    
    <div class="counter-card">
      <my-counter initial="50" min="0" max="100" step="5" theme="green"></my-counter>
    </div>
    
    <div class="counter-card">
      <my-counter initial="0" min="-10" max="10" step="2" theme="purple"></my-counter>
    </div>
  </div>
`;

// Add theme switching functionality
document.querySelectorAll('.theme-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const target = e.currentTarget as HTMLElement;
    const theme = target.dataset.theme;
    
    document.querySelectorAll('my-counter').forEach(counter => {
      (counter as any).theme = theme;
    });
  });
});