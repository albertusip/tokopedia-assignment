import React, { useContext } from 'react';
import { Button, ButtonOutline, Card, Col, mb3, Row } from '../../../styles';
import { cardPokemon, wrapperCardImage, wrapperCardValue, wrapperInfo } from './../styles';
import { capitalize } from '../../../helper/index';
import { colorPrimary, colorDanger } from '../../../color';
import { string, number } from 'prop-types';
import { NavLink } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import ListContext from '../../../contexts/MyPokemonsContext';
import Swal from 'sweetalert2';

const PokemonCard = ({ index, image, nickname, name, speciesName }) => {
    const { myPokemons, setMyPokemons } = useContext(ListContext);
    const theme = useTheme();

    let wrapperSwalText = ({ title, text }) => (
        `
            <div style="
                color: ${theme.colorTextPrimary};
                position: relative;
                max-width: 100%;
                margin: 0 0 .4em;
                padding: 0;
                font-size: 1.875rem;
                font-weight: 600;
                text-align: center;
                text-transform: none;
                word-wrap: break-word;
            ">
                ${title}
            </div>
            ${text ? `<div style="color: ${theme.colorTextPrimary}">${text}</div>` : ''}
        `
    );

    const releasePokemon = ({ index, name }) => {
        Swal.fire({
            html: wrapperSwalText({
                title: 'Are you sure?',
                text: 'You won\'t be able to revert this!'
            }),
            icon: 'warning',
            background: theme.colorBgCardSecondary,
            showCancelButton: true,
            confirmButtonColor: colorDanger,
            confirmButtonText: 'Yes, release it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const tempPokemons = myPokemons.filter((item, idx) => idx !== index);
                setMyPokemons(tempPokemons);
                const tempPokemonsStringify = JSON.stringify(tempPokemons);
                
                localStorage.setItem('myPokemons', tempPokemonsStringify);
                Swal.fire({
                    html: wrapperSwalText({
                        title: 'Released!',
                        text: `${name} has been released.`
                    }),
                    background: theme.colorBgCardSecondary,
                    icon: "success",
                    confirmButtonColor: colorPrimary,
                });
            };
        });
    };

    return myPokemons.length && (
        <Col sm="12" md="6">
            <Card className={cardPokemon(theme)}>
                <Row>
                    <Col sm="12" className={wrapperCardImage}>
                        <img src={image} alt={nickname}></img>
                    </Col>
                    <Col sm="12" className={wrapperCardValue(theme)}>
                        <div className="title">
                            {nickname}
                        </div>
                        <div className={`${wrapperInfo}`}>
                            <div className="title">
                                Real Name:
                            </div>
                            <span className="value">
                                {capitalize(name)}
                            </span>
                        </div>
                        <div className={`${wrapperInfo}`}>
                            <div className="title">
                                Species:
                            </div>
                            <span className="value">
                                {capitalize(speciesName)}
                            </span>
                        </div>
                    </Col>
                    <Col sm="12">
                        <NavLink to={`/detail/${name}/${index}/${nickname}`}>
                            <Button fluid className={mb3}>
                                Detail Pokemon
                            </Button>
                        </NavLink>
                        <ButtonOutline
                            fluid
                            className="danger"
                            onClick={() => releasePokemon({ index: index, name: nickname })}
                        >
                            Release Pokemon
                        </ButtonOutline>
                    </Col>
                </Row>
            </Card>
        </Col>
    );
};

export default PokemonCard;

PokemonCard.propTypes = {
    index: number.isRequired,
    name: string.isRequired,
    nickname: string.isRequired,
    speciesName: string.isRequired,
    image: string.isRequired
};