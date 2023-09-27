
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "./main.scss"
import { I18nextProvider } from 'react-i18next';
import i18nConfig from './i18n/config.ts'
import store from './stores/index.ts';
import { Provider } from 'react-redux';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <I18nextProvider i18n={i18nConfig}>
      <App />
    </I18nextProvider>
  </Provider>



)
