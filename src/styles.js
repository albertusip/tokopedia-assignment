import { withTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { css } from '@emotion/css';
const breakPoint = {
    small: 576,
    medium: 768,
    large: 992,
    extraLarge: 1200
};

export const colsMin = keyBreakPoint => {
    const breakPointArray = Object.keys(breakPoint).map(key => [key, breakPoint[key]]);

    const [result] = breakPointArray.reduce((current, [name, size]) =>
        keyBreakPoint === name ? [...current, `@media (min-width: ${size}px)`] : current
    , []);

    return result;
};

export const colsMax = keyBreakPoint => {
    const breakPointArray = Object.keys(breakPoint).map(key => [key, breakPoint[key]]);

    const [result] = breakPointArray.reduce((current, [name, size]) => 
        keyBreakPoint === name ? [...current, `@media (max-width: ${size}px)`] : current
    , []);

    return result;
};

export const max100vh = css`
    height: 100%;
    max-height: 100vh;
`;

export const fluid = css`

    ${colsMax('small')} {
        padding: 0px!important;
	};
`;

export const mb3 = css`
    margin-bottom: 0.5rem;
`;

export const Chips = withTheme(styled.div`
    display: inline-block;
    background-color: ${props => props.theme.colorBgChips};
    border-radius: 25px;
    color: ${props => props.theme.colorTextChips};
    font-size: 12px;
    margin: 5px 10px 5px 0px;
    padding: 2px 10px;
    transition: all ${props => props.theme.transitionFast};
`);

export const Main = withTheme(styled.div`
    background: ${props => props.theme.colorBgPrimary};
    height: 100vh;
    overflow-x: auto;
    overflow-y: hidden;
    transition: background ${props => props.theme.transitionFast};
`);

export const Header = withTheme(styled.div`
    align-items: center;
    background: ${props => props.theme.colorBgCardPrimary};
    display: flex;
    height: 50px;
    margin: 0px -15px;
    padding: 15px 20px 10px;
    transition: all 0.3s, background ${props => props.theme.transitionFast};

    .header-title {
        color: ${props => props.theme.colorPrimary};
        font-weight: 700;
        .path {
            font-weight: normal;
        }
    }

    ${colsMin('small')} {
        background-color: transparent;
        border-radius: 5px;
        padding: 15px 0px 10px;
	};
`);

export const ButtonOutline = withTheme(styled.button`
    color: ${props => props.theme.colorButtonOutlinePrimary};
    background-color: transparent;
    border: 1px solid ${props => props.theme.colorButtonOutlinePrimary};
    border-radius: 4px;
    font-size: 12px;
    font-weight: 700;
    height: auto;
    padding: 10px 15px;
    text-align: center;
    min-width: 110px;
    transition: all ${props => props.theme.transitionFast};
    
    ${props => props.fluid && ({
        width: '100%'
    })}

    &.danger {
        color: ${props => props.theme.colorTextDanger};
        background-color: ${props => props.theme.colorButtonDanger};
        border: 1px solid ${props => props.theme.colorBorderButtonDanger};
        transition: all ${props => props.theme.transitionFast};
        &:hover {
            color: ${props => props.theme.colorTextDangerHover};
            background-color: ${props => props.theme.colorButtonDangerHover};
            border: 1px solid ${props => props.theme.colorBorderButtonDangerHover};
            box-shadow: ${props => props.theme.colorBoxShadow && `0 1px 10px ${props.theme.colorBoxShadow}`};
        }
    }

    &:hover {
        cursor: pointer;
        color: ${props => props.theme.colorWhite};
        background-color: ${props => props.theme.colorButtonOutlinePrimaryHover};
        border: 1px solid ${props => props.theme.colorButtonOutlinePrimaryHover};
        box-shadow: ${props => props.theme.colorBoxShadow && `0 1px 10px ${props.theme.colorBoxShadow}`};
    }
    &:focus {
        box-shadow: none;
        outline:0;
    }
`);

export const Button = withTheme(styled.button`
    cursor: pointer;
    color: ${props => props.theme.colorWhite};
    background: ${props => props.theme.colorButtonPrimary};
    border: 1px solid ${props => props.theme.colorButtonPrimary};
    border-radius: 4px;
    font-size: 12px;
    font-weight: 700;
    height: auto;
    padding: 10px 15px;
    text-align: center;
    transition: all ${props => props.theme.transitionFast};

    ${props => props.fluid && ({
        width: '100%'
    })}

    &:hover {
        color: ${props => props.theme.colorWhite};
        background: ${props => props.theme.colorButtonPrimary};
        border: 1px solid ${props => props.theme.colorButtonPrimary};
        box-shadow: ${props => props.theme.colorBoxShadow && `0 1px 10px ${props.theme.colorBoxShadow}`};
    }
    &:focus {
        box-shadow: none;
        outline:0;
    }
    &:disabled {
        cursor: auto;
        color: ${props => props.theme.colorWhite};
        background: ${props => props.theme.colorButtonDisabled};
        border: 1px solid ${props => props.theme.colorButtonDisabled};
        &:hover {
            color: ${props => props.theme.colorWhite};
            background: ${props => props.theme.colorButtonDisabledHover};
            border: 1px solid ${props => props.theme.colorButtonDisabledHover};
            box-shadow: none;
        }
    }
`);

export const Card = withTheme(styled.div`
    background: ${props => props.theme.colorBgCardPrimary};
    border-bottom: 1px solid;
    border-color: ${props => props.theme.colorBorderCard}!important;
    border-radius: 0px;
    padding: 15px 20px 10px;
    transition: all ${props => props.theme.transitionFast}, border-color ${props => props.theme.transitionFast};

    .greeting {
        color: ${props => props.theme.colorPrimary};
        margin-bottom: 10px;
        width: 100%;
    }
    .info {
        display: inline-block;
        width: 50%;
        .title {
            color: ${props => props.theme.colorTextTertiary};
            font-size: 12px;
        }
        .value {
            color: ${props => props.theme.colorTextSecondary};
            font-size: 14px;
            transition: color ${props => props.theme.transitionFast};
            .total {
                font-weight: 600;
                margin-right: 5px;
            }
        }
    }
    .wrapper-button {
        display: inline-block;
        text-align: right;
        width: 50%;
    }

    ${props => props.flexWrap && ({
        display: 'flex',
        flexWrap: 'wrap'
    })}

    ${props => props.height && ({
        height: `${props.height}%`
    })}

    ${colsMin('small')} {
        border: 1px solid;
        border-radius: 5px;
	};
`);

export const Footer = withTheme(styled.div`
    align-items: center;
	background: ${props => props.theme.colorBgCardPrimary};
    bottom: 0px;
    border: 1px solid;
    border-color: ${props => props.theme.colorBorderCard}!important;
    border-radius: 0px;
    display: flex;
    height: 50px;
    margin: 0px -15px;
    position: absolute;
    width: 100%;
    transition: background ${props => props.theme.transitionFast}, border-color ${props => props.theme.transitionFast};
    
    .footer-menu {
        align-items: center;
        cursor: pointer;
        color: ${props => props.theme.colorTextTertiary};
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        font-size: 12px;
        text-align: center;
        text-decoration: none;

        &:hover {
            color: ${props => props.theme.colorPrimary};
        }
        &.selected {
            color: ${props => props.theme.colorPrimary};
        }
    }

    ${colsMin('small')} {
        border: 1px solid;
        border-radius: 5px;
	};
`);

export const Wrapper = styled.div`
	padding-right: 15px;
	padding-left: 15px;
    height: ${props => props.fillHeight && '100vh'};
	margin-right: auto;
	margin-left: auto;
    min-width: ${props => props.minWidth && `${props.minWidth}px`};
    position: relative;
    transition: all 0.3s;
  	width: 100%;

    ${props => props.flexWrap && ({
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: props.alignHorizontal
    })}

	${colsMin('small')} {
		max-width: 540px;
	};
	${colsMin('medium')} {
		max-width: 720px;
	};
`;

export const Row = styled.div`
	display: flex;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
`;

export const Col = styled.div`
    min-height: 1px;
    position: relative;
    padding-right: 15px;
    padding-left: 15px;
    transition: all 0.3s;
    width: 100%;

    ${props => props.height && ({
        height: `${props.height}%`
    })}

    ${colsMin('small')} {
        ${props => {
            switch (props.sm) {
                case '12':
                    return {
                        flex: '0 0 100%',
                        maxWidth: '100%'
                    };
                case '8':
                    return {
                        flex: '0 0 66.666667%',
                        maxWidth: '66.666667%'
                    };
                case '6':
                    return {
                        flex: '0 0 50%',
                        maxWidth: '50%'
                    };
                case '4':
                    return {
                        flex: '0 0 33.33333%',
                        maxWidth: '33.33333%'
                    };
                case '3':
                    return {
                        flex: '0 0 25%',
                        maxWidth: '25%'
                    };
                default:
                    break;
            }
        }}
	};
	${colsMin('medium')} {
		${props => {
            switch (props.md) {
                case '12':
                    return {
                        flex: '0 0 100%',
                        maxWidth: '100%'
                    };
                case '8':
                    return {
                        flex: '0 0 66.666667%',
                        maxWidth: '66.666667%'
                    };
                case '6':
                    return {
                        flex: '0 0 50%',
                        maxWidth: '50%'
                    };
                case '4':
                    return {
                        flex: '0 0 33.33333%',
                        maxWidth: '33.33333%'
                    };
                case '3':
                    return {
                        flex: '0 0 25%',
                        maxWidth: '25%'
                    };
                default:
                    break;
            }
        }}
	};
`;