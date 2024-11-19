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