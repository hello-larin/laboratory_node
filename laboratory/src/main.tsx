import ReactDOM from 'react-dom/client'
import App from './App'
import store from './store';
import { Provider } from 'react-redux'

import 'bootstrap/dist/css/bootstrap.min.css'

import './style.css'


ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <App />
    </Provider>
 ,
)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register("/node_rip/serviceWorker.js")
      .then(() => console.log('Service worker registered'))
      .catch((err) => console.log('Service worker not registered', err));
  });
}