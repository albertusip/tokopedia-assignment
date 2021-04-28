import React, { useState, useEffect } from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { ThemeProvider } from '@emotion/react'
import { ButtonOutline, Card, Col, fluid, Footer, Header, Main, Row, Wrapper, max100vh } from './styles.js';
import { light, dark, global } from './color.js';
import loadable from '@loadable/component';
import ListContext from './contexts/MyPokemonsContext';
import PokeballIcon from 'mdi-react/PokeballIcon';
import FormatListBulletedIcon from 'mdi-react/FormatListBulletedIcon';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	NavLink
} from 'react-router-dom';
import './App.css';

const PokemonDetail = loadable(() => import('./components/PokemonDetail/index'));
const PokemonList = loadable(() => import('./components/PokemonList/index'));
const MyPokemon = loadable(() => import('./components/MyPokemon/index'));

const client = new ApolloClient({
	uri: "https://graphql-pokeapi.vercel.app/api/graphql",
	cache: new InMemoryCache()
});

const App = () => {
	const [myPokemons, setMyPokemons] = useState([]);
	const [darkMode, setDarkMode] = useState(true);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		const tempDarkMode = (JSON.parse(localStorage.getItem('darkMode'))) || false;
		const tempPokemons = (JSON.parse(localStorage.getItem('myPokemons'))) || [];
		setMyPokemons(tempPokemons);
		setDarkMode(tempDarkMode);

		setLoading(false);
	}, []);

	useEffect(() => {
		localStorage.setItem('darkMode', darkMode);
	}, [darkMode]);

	return !loading && (
		<Router>
			<ListContext.Provider value={{ myPokemons, setMyPokemons, darkMode }}>
				<ThemeProvider theme={darkMode ? { ...global, ...dark } : { ...global, ...light }}>
					<Main>
						<Wrapper className={max100vh} minWidth="360">
							<Header>
								<div className="header-title">
									Pokemon App | {
										<>
											<Route exact path="/">
												<span className="path">
													List All Pokemon
												</span>
											</Route>
											<Route exact path="/my-pokemon">
												<span className="path">
													List My Pokemon
												</span>
											</Route>
											<Route exact path="/detail/:name">
												<span className="path">
													Detail Pokemon
												</span>
											</Route>
											<Route exact path="/detail/:name/:index/:nickname">
												<span className="path">
													Detail Your Pokemon
												</span>
											</Route>
										</>
									}
								</div>
							</Header>
							<Row>
								<Col sm="12" className={fluid}>
									<Card flexWrap>
										<div className="greeting">
											{
												<>
													<Route exact path="/">
														<span className="path">
															Welcome, Let's catch some Pokemon !!
														</span>
													</Route>
													<Route exact path="/my-pokemon">
														<span className="path">
															Here is your Pokemon
														</span>
													</Route>
													<Route exact path="/detail/:name">
														<span className="path">
															Wanna catch this Pokemon??
														</span>
													</Route>
													<Route exact path="/detail/:name/:index/:nickname">
														<span className="path">
															Here is your Detail Pokemon
														</span>
													</Route>
												</>
											}
										</div>
										<div className="info">
											<div className="title">
												Total My Pokemon
											</div>
											<div className="value">
												<span className="total">
													{myPokemons.length}
												</span>
												Pokemon
											</div>
										</div>

										<div className="wrapper-button">
											<ButtonOutline onClick={() => setDarkMode(!darkMode)}>
												{darkMode ? 'Light Mode' : 'Dark Mode'}
											</ButtonOutline>
										</div>
									</Card>
								</Col>
							</Row>
							<ApolloProvider client={client}>
								<Switch>
									<Route exact path="/">
										<PokemonList></PokemonList>
									</Route>
								</Switch>
								<Switch>
									<Route exact path="/detail/:name/:index/:nickname">
										<PokemonDetail></PokemonDetail>
									</Route>
									<Route exact path="/detail/:name">
										<PokemonDetail></PokemonDetail>
									</Route>
								</Switch>
								<Switch>
									<Route exact path="/my-pokemon">
										<MyPokemon></MyPokemon>
									</Route>
								</Switch>
							</ApolloProvider>
							<Footer>
								<Wrapper flexWrap alignHorizontal="space-around">
									<NavLink exact to="/" activeClassName="selected" className="footer-menu">
										<FormatListBulletedIcon size={18} />
										Pokemon list
									</NavLink>
									<NavLink exact to="/my-pokemon" activeClassName="selected" className="footer-menu">
										<PokeballIcon size={18} />
										My Pokemon
									</NavLink>
								</Wrapper>
							</Footer>
						</Wrapper>
					</Main>
				</ThemeProvider>
			</ListContext.Provider>
		</Router>
	);
};

export default App;
