import React from 'react';
// import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import App from './App';
import { FirebaseContext } from './store/FirebaseContext.js';
import { fireb, firestore, auth,storage } from './firebase/config';
import Context from './store/FirebaseContext';

const root = createRoot(document.getElementById('root'));
root.render(
    <FirebaseContext.Provider value={{ firestore, auth, storage}}>
        <Context>
            <App />
        </Context>
    </FirebaseContext.Provider>
    );
