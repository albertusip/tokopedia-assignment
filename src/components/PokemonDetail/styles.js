import { css } from '@emotion/css';

export const wrapperDetail = css`
    margin: 10px 0px;
    max-height: calc(100vh - 210px);
`;

export const wrapperImage = css`
    text-align: center;

    img {
        width: 150px;
    }
`;

export const header = (theme) => css`
    font-weight: 600;
    color: ${theme.colorTextSecondary};
    transition: color ${theme.transitionFast};
`;

export const wrapperInfo = (theme) => css`
    .title {
        display: inline-block;
        font-size: 14px;
        margin-right: 5px;
        color: ${theme.colorTextPrimary};
        transition: color ${theme.transitionFast};
	}
    .value {
		color: ${theme.colorTextPrimary};
        transition: color ${theme.transitionFast};
	}
`;

export const wrapperChips = css`
    &.wrapperMoves {
        height: 100%;
        overflow: auto;
    }
`;

export const rowDetail = (theme) => css`
    height: 100%;
    align-content: baseline;
    overflow: auto;

    .colCustomHeight {
        .title {
            color: ${theme.colorTextPrimary};
            transition: color ${theme.transitionFast};
        }
    }
`;