import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container,Row,Col } from 'react-bootstrap';
import Contact from './component/contact';
import Payment from './component/payment';
import './App.css';

const App =() => {
	return (
		<div className="App">
			<header className="App-header">
				<Container className="bg">
					<Row>
						<Col md={{ order: 'first' }} className="content">
							<Contact />
						</Col>
						<Col md={{ order: 'last' }} className="content">
							<Payment />
						</Col>
					</Row>
				</Container>
			</header>
		</div>
	)
}

export default App;
