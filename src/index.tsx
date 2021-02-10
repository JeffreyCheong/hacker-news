import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Helmet } from 'react-helmet';

// #ff6600 orange header
// 
ReactDOM.render(
  <React.StrictMode>
    <Helmet>
      <meta name="referrer" content="origin" />
      <title>New Links | Hacker News</title>
      <meta name="description" content="Hacker News is a social news website focusing on computer science and entrepreneurship" />
    </Helmet>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
