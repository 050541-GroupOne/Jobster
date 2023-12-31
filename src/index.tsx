import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {store} from "./features/store.ts";
import {Provider} from "react-redux";
import 'normalize.css';
import './index.css';
import './services/firebase/firebaseConfig.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
)
