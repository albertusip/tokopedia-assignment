import { css }  from '@emotion/css';

export const cardPokemon = (theme) => css`
	margin: 5px;
    background: ${theme.colorBgCardSecondary}!important;
`;

export const btnPaginate = css`
    align-items: center;
    display: flex;
    height: 30px;
    justify-content: center;
`;
export const wrapperNavigation = (theme) => css`
	display: flex;
    justify-content: space-between;
    
    .wrapperPage {
        align-items: center;
        display: flex;
        color: ${theme.colorTextPrimary};
    }
`;

export const wrapperPokeList = (theme) => css`
    background: ${theme.colorBgCardPrimary};
    border: 1px solid ${theme.colorBorderCard};
    border-radius: 5px;
    margin: 10px 0px 20px 0px;
    max-height: calc(100vh - 300px);
    overflow-y: auto;
    padding: 0px 10px;
    transition: background ${theme.transitionFast}, border ${theme.transitionFast};
`;

export const rowPokeList = css`
	padding: 10px 10px;
`;

export const wrapperCardImage = css`
	text-align: center;
`;

export const wrapperCardValue = (theme) => css`
	display: flex;
    flex-wrap: wrap;
    flex-direction: column;
	text-align: center;
    justify-content: space-between;

	.title {
		margin-bottom: 14px;
        color: ${theme.colorTextPrimary};
        transition: ${theme.transitionFast};
	}
`;