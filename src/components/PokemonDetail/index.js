import React, { useContext } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useHistory, useParams } from 'react-router-dom';
import { Button, ButtonOutline, Card, Chips, Col, mb3, Row, Wrapper } from '../../styles';
import { header, rowDetail, wrapperChips, wrapperInfo, wrapperDetail, wrapperImage } from './styles';
import { capitalize } from '../../helper/index';
import { colorDanger, colorPrimary } from '../../color';
import { useTheme } from '@emotion/react';
import ListContext from '../../contexts/MyPokemonsContext';
import Swal from 'sweetalert2';
import loadable from '@loadable/component';

const Loading = loadable(() => import('../Loading/index'));

const POKEMON = gql`
	query pokemon($name: String!) {
		pokemon(name: $name) {
			abilities {
                ability {
                    url
                    name
                }
            }
            id
            moves {
                move {
                    name
                }
            }
            name
            species {
                name
                url
            }
            sprites {
                front_default
            }
            types {
                type {
                    name
                    url
                }
            }
		}
	}
`;

const DetailPokemon = () => {
    let history = useHistory();
    const theme = useTheme();
    const { myPokemons, setMyPokemons } = useContext(ListContext);
    const { name, nickname, index } = useParams();
    const { loading, error, data } = useQuery(POKEMON, {
        variables: { name: name },
    });

    let wrapperSwalText = ({title, text}) => (
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

    const releasePokemon = (themeStyle) => {
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
                const tempPokemons = myPokemons.filter((item, idx) => idx !== parseInt(index));
                setMyPokemons(tempPokemons);
                const tempPokemonsStringify = JSON.stringify(tempPokemons);
                localStorage.setItem('myPokemons', tempPokemonsStringify);
                Swal.fire({
                    html: wrapperSwalText({
                        title: 'Released!',
                        text: `${nickname} has been released.`
                    }),
                    background: theme.colorBgCardSecondary,
                    icon: "success",
                    confirmButtonColor: colorPrimary,
                }).then(() => {
                    history.push('/my-pokemon');
                });
            };
        });
    };

    const catchPokemon = () => {
        let isCatch = Math.random() >= 0.5; // 0.5 = 50% probability

        Swal.fire({
            html: wrapperSwalText({
                title: 'Catching a Pokemon..'
            }),
            background: theme.colorBgCardSecondary,
            timer: 800,
            timerProgressBar: true,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        }).then(() => {
            if (isCatch) {
                Swal.fire({
                    html: wrapperSwalText({
                        title: `Success catch a ${capitalize(data.pokemon?.name)}`,
                        text: 'Please give a nickname'
                    }),
                    input: 'text',
                    confirmButtonText: 'Save',
                    background: theme.colorBgCardSecondary,
                    confirmButtonColor: colorPrimary,
                    showCancelButton: true,
                    allowOutsideClick: false,
                    didOpen: () => {
                        document.querySelector('.swal2-content').style.color = theme.colorTextPrimary;
                    },
                    inputValidator: (value) => {
                        document.querySelector('.swal2-validation-message').style.background = theme.colorBgSwalErrorValidation;
                        document.querySelector('.swal2-validation-message').style.color = theme.colorTextPrimary;
                        if (!value) {
                            return 'Name must be filled'
                        }
                    }
                }).then(res => {
                    if (res.isConfirmed) {
                        const checkSameName = myPokemons.filter(item => item.nickname === res.value);
                        if (checkSameName.length > 0) {
                            Swal.fire({
                                html: wrapperSwalText({
                                    title: "Fail !!!",
                                    text: "This pokemon nickname already exists in your pokemon list, please use another nickname."
                                }),
                                background: theme.colorBgCardSecondary,
                                icon: "error",
                                confirmButtonColor: colorDanger
                            });
                        } else {
                            const tempPokemon = [...myPokemons, {
                                ...data.pokemon,
                                nickname: res.value
                            }];
                            const pokemonStringify = JSON.stringify(tempPokemon);
                            localStorage.setItem('myPokemons', pokemonStringify);
                            setMyPokemons(tempPokemon);
                            Swal.fire({
                                html: wrapperSwalText({
                                    title: "Success !!!",
                                    text: "Check the My Pokemon page to see your Pokemon"
                                }),
                                background: theme.colorBgCardSecondary,
                                icon: "success",
                                confirmButtonColor: colorPrimary
                            });
                        };
                    };
                });
            } else {
                Swal.fire({
                    html: wrapperSwalText({
                        title: "Pokemon run away !!!",
                        text: "Come on don't give up !! hunt again :)"
                    }),
                    background: theme.colorBgCardSecondary,
                    icon: "error",
                    confirmButtonColor: colorDanger,
                });
            };
        });
    };

    
    

    if (loading) return <Loading />
    if (error) return <p>Error!!</p>
    
    return (
        <> 
            <Wrapper fillHeight className={wrapperDetail}>
                <Card height="100">
                    <Row className={rowDetail(theme)}>
                        <Col sm="12" md="4" className={wrapperImage}>
                            <img src={data.pokemon.sprites.front_default} alt={data.pokemon.sprites.__typename}></img>
                        </Col>
                        <Col sm="12" md="8" className={wrapperInfo(theme)}>
                            <div className={`${mb3}`}>
                                <span className={header(theme)}>
                                    {capitalize(data.pokemon?.name)}
                                </span>
                            </div>
                            {
                                nickname &&
                                <div className={`${mb3}`}>
                                    <div className="title">
                                        Nickname:
                                </div>
                                    <span className="value">
                                        {nickname}
                                    </span>
                                </div>
                            }
                            <div className={`${mb3}`}>
                                <div className="title">
                                    Species: 
                                </div>
                                <span className="value">
                                    {capitalize(data.pokemon.species?.name)}
                                </span>
                            </div>
                            <div className={`${wrapperChips} ${mb3}`}>
                                <div className="title">
                                    Types:
                                </div>
                                {
                                    data.pokemon?.types.map((item, index) => (
                                        <Chips key={index}>
                                            {capitalize(item?.type?.name)}
                                        </Chips>
                                    ))
                                }
                            </div>
                            <div className={`${wrapperChips} ${mb3}`}>
                                <div className="title">
                                    Abilities:
                                </div>
                                {
                                    data.pokemon?.abilities.map((item, index) => (
                                        <Chips key={index}>
                                            {capitalize(item?.ability?.name)}
                                        </Chips>
                                    ))
                                }
                            </div>
                            {
                                nickname ?
                                <div className={mb3}>
                                    <ButtonOutline
                                        className="danger"
                                        fluid
                                        onClick={() => releasePokemon(theme)}
                                    >
                                            Release Pokemon
                                    </ButtonOutline>
                                </div> :
                                <div className={mb3}>
                                    <Button
                                        fluid
                                        onClick={() => catchPokemon()}
                                    >
                                        Catch Me
                                    </Button>
                                </div>
                            }
                        </Col>
                        <Col height="70" sm="12" className="colCustomHeight">
                            <div className="title">
                                Moves:
                            </div>
                            <div className={`${wrapperChips} wrapperMoves`}>
                                <div className={`${mb3}`}>
                                    {
                                        data.pokemon?.moves.map((item, index) => (
                                            <Chips key={index}>
                                                {capitalize(item?.move?.name)}
                                            </Chips>
                                        ))
                                    }
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Card>
            </Wrapper>
        </>
    );
};

export default DetailPokemon;