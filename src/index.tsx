import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import store from './redux/stores/NodesStore'
import { ReactFlowProvider } from 'reactflow';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ReactFlowProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ReactFlowProvider>
  </React.StrictMode>
);


