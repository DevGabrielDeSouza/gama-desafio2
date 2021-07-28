import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GlobalStyle from './globalStyle';

ReactDOM.render(
	/*<React.StrictMode>*/
	<React.Fragment>
		<App />
		<GlobalStyle/>
	</React.Fragment>,
	/*</React.StrictMode>,*/
  document.getElementById('root')
);
