import React from 'react';
import PokemonGoIcon from 'mdi-react/PokemonGoIcon';
import { LoadingStyle, iconLoading } from './styles';

const Loading = () => {
    return (
        <LoadingStyle>
            <PokemonGoIcon className={iconLoading} />
        </LoadingStyle>
    )
};

export default Loading;