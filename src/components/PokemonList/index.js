import React, { useState, useContext } from 'react';
import { gql, useQuery } from '@apollo/client';
import { btnPaginate, cardPokemon, rowPokeList, wrapperCardImage, wrapperCardValue, wrapperNavigation, wrapperPokeList } from './styles';
import { Button, Card, Col, Row, Wrapper } from '../../styles';
import { capitalize } from '../../helper/index';
import { NavLink } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import ListContext from '../../contexts/MyPokemonsContext';
import Loading from '../Loading/index';
import ChevronRightIcon from 'mdi-react/ChevronRightIcon';
import ChevronLeftIcon from 'mdi-react/ChevronLeftIcon';

const POKEMON_LIST = gql`
	query pokemons($limit: Int, $offset: Int) {
		pokemons(limit: $limit, offset: $offset) {
			count
			next
			previous
			status
			message
			results {
				url
				name
				image
			}
		}
	}
`;

const LIMIT = 10;

const PokemonList = () => {
	const [offset, setOffset] = useState(1);
	const [page, setPage] = useState({
		current: 1,
		total: 1
	});
	const { darkMode } = useContext(ListContext);
	const theme = useTheme();

	const { loading, error, data, refetch  } = useQuery(POKEMON_LIST, {
		variables: { limit: LIMIT, offset: offset },
		fetchPolicy: "cache-and-network",
		onCompleted: data => setPage({
			...page,
			total: Math.ceil(data?.pokemons?.count / LIMIT)
		})
	});

	const paginationClick = (newOffset) => {
		const newCurrentPage = Math.floor(newOffset / LIMIT) + 1;
		setOffset(newOffset);
		setPage({
			...page,
			current: newCurrentPage
		});
		refetch({
			variables: { limit: LIMIT, offset: newOffset },
			notifyOnNetworkStatusChange: true
		});
	}
	
	if (error) return <p>Error!!</p>
	return (
		<>
			<Wrapper className={wrapperPokeList(theme)} fillHeight>
				{
					loading ? <Loading /> :
					<Row className={rowPokeList}>
						{
							data?.pokemons?.results.map((item, index) => (
								<Col key={index} sm="12" md="6">
									<Card className={cardPokemon(theme)} darkMode={darkMode}>
										<Wrapper>
											<Row>
												<Col sm="6" md="6" className={wrapperCardImage}>
													<img src={item.image} alt={item.__typename}></img>
												</Col>
												<Col sm="6" md="6" className={wrapperCardValue(theme)}>
													<div className="title">{capitalize(item.name)}</div>
													<NavLink to={`/detail/${item.name}`}>
														<Button fluid>Detail</Button>
													</NavLink>
												</Col>
											</Row>
										</Wrapper>
									</Card>
								</Col>
							))
						}
					</Row>
				}
			</Wrapper>
			<Wrapper className={wrapperNavigation(theme)}>
				<Button
					disabled={offset === 1}
					className={btnPaginate}
					onClick={() => paginationClick(offset - LIMIT)}
				>
					<ChevronLeftIcon size={18} />
					Previous
				</Button>
				<div className="wrapperPage">
					Page: {page.current} / {page.total}
				</div>
				<Button
					// I am confused here whether I should use disable when page same with total page or disable when data.pokemons.next === null.
					// Because if I use disable button when data.pokemons.next === null, there won't be many requests if the user clicks one by one
					// because user have to wait for the previous request to finish but it takes a long time if the user wants to go to a certain page immediately.
					// If using disable button when page same with total page, The user can load the specified page faster, but this generates a large list of requests for the page skipped.
					disabled={page.current === page.total} // data?.pokemons?.next === null
					className={btnPaginate}
					onClick={() => paginationClick(offset + LIMIT)}
				>
					Next
				<ChevronRightIcon size={18} />
				</Button>
			</Wrapper>
		</>
	);
};

export default PokemonList;