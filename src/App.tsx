import React from 'react';
import Store from './components/Store';
import Navbar from './components/Navbar';
import Home from './view/Home';

// import { Container } from './styles';

const App: React.FC = () => {
	return (
		<div>
			<Navbar/>
			<Store />
		</div>
	);
}

export default App;