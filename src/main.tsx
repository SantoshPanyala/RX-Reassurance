import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import App from './App.tsx'
import system from './theme'
import './theme.css'

// Add error handler to catch any initialization errors
window.addEventListener('error', (event) => {
  // #region agent log
  fetch('http://127.0.0.1:7244/ingest/ce92f0db-d97d-4ac5-956e-d769c064fdb9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.tsx:9',message:'WINDOW ERROR CAUGHT',data:{message:event.message,filename:event.filename,lineno:event.lineno,error:String(event.error)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{});
  // #endregion
});

window.addEventListener('unhandledrejection', (event) => {
  // #region agent log
  fetch('http://127.0.0.1:7244/ingest/ce92f0db-d97d-4ac5-956e-d769c064fdb9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.tsx:15',message:'UNHANDLED PROMISE REJECTION',data:{reason:String(event.reason)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{});
  // #endregion
});

console.log('🚀 Tracking App - Initializing...');
console.log('📍 Current URL:', window.location.href);

// #region agent log
fetch('http://127.0.0.1:7244/ingest/ce92f0db-d97d-4ac5-956e-d769c064fdb9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.tsx:23',message:'main.tsx entry point',data:{url:window.location.href,pathname:window.location.pathname},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
// #endregion

const rootElement = document.getElementById('root');
// #region agent log
fetch('http://127.0.0.1:7244/ingest/ce92f0db-d97d-4ac5-956e-d769c064fdb9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.tsx:29',message:'root element check',data:{rootExists:!!rootElement},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{});
// #endregion

if (!rootElement) {
  // #region agent log
  fetch('http://127.0.0.1:7244/ingest/ce92f0db-d97d-4ac5-956e-d769c064fdb9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.tsx:33',message:'ERROR: root element not found',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{});
  // #endregion
  throw new Error('Root element not found');
}

// Render app directly without React Router
ReactDOM.createRoot(rootElement).render(
  <StrictMode>
    <ChakraProvider value={system}>
      <App />
    </ChakraProvider>
  </StrictMode>,
)

// #region agent log
fetch('http://127.0.0.1:7244/ingest/ce92f0db-d97d-4ac5-956e-d769c064fdb9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.tsx:45',message:'ReactDOM.render completed',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
// #endregion