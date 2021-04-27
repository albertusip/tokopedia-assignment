import { css } from '@emotion/css';

export const cardPokemon = (theme) => css`
	margin: 5px;
    background-color: ${theme.colorBgCardSecondary}!important;
`;

export const wrapperPokeList = (theme) => css`
	background-color: ${theme.colorBgCardPrimary};
    border: 1px solid ${theme.colorBorderCard};
    border-radius: 5px;
    margin: 10px 0px 20px 0px;
	max-height: calc(100vh - 210px);
	overflow-y: auto;
    padding: 0px 10px;
    transition: all ${theme.transitionFast};

    &.wrapperNotFound {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: ${theme.colorNotFound};
    }
`;

export const wrapperInfo = css`
    .title {
        display: inline-block;
        font-size: 14px;
        margin-right: 5px;
    }
`;

export const rowPokeList = css`
	padding: 10px 10px;
`;

export const wrapperCardImage = css`
	text-align: center;
`;

export const wrapperCardValue = (theme) => css`
	.title {
		margin-bottom: 12px;
        color: ${theme.colorTextPrimary};
        transition: all ${theme.transitionFast};
	}
    .value {
		color: ${theme.colorTextPrimary};
        transition: all ${theme.transitionFast};
	}
`;