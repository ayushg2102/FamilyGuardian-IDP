import '@testing-library/jest-dom';

// Polyfill for TextEncoder in Node.js (for React Router, AntD, etc.)
import { TextEncoder } from 'util';
if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder;
}
