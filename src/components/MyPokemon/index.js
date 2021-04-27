import React, { useContext } from 'react';
import { Row, Wrapper } from '../../styles';
import { rowPokeList, wrapperPokeList } from './styles';
import { useTheme } from '@emotion/react';
import ThoughtBubbleOutlineIcon from 'mdi-react/ThoughtBubbleOutlineIcon';
import PokemonCard from './components/PokemonCard';
import ListContext from '../../contexts/MyPokemonsContext';

const MyPokemon = () => {
    const { myPokemons } = useContext(ListContext);
    const theme = useTheme();

    return (
        <> 
            {
                myPokemons.length ?
                <Wrapper className={wrapperPokeList(theme)} fillHeight>
                    <Row className={rowPokeList}>
                        {
                            myPokemons.map((item, index) => (
                                <PokemonCard
                                    key={index}
                                    nickname={item.nickname}
                                    name={item.name}
                                    image={item?.sprites?.front_default}
                                    speciesName={item?.species?.name}
                                    index={index}
                                />
                            ))
                        }
                    </Row>
                </Wrapper> :
                    <Wrapper className={`${wrapperPokeList(theme)} wrapperNotFound`} fillHeight>
                    <ThoughtBubbleOutlineIcon size={100} />
                    <div>You don't have Pokemon.</div>
                    <div>Go and get your Pokemon!!</div>
                </Wrapper>
            }
        </>
    );
};

export default MyPokemon;