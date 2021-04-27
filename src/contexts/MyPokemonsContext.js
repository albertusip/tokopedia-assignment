import { createContext } from "react";

const MyPokemonsContext = createContext({
    myPokemons: [],
    darkMode: false,
    setDarkMode: () => {},
    setMyPokemons: () => {}
});

export default MyPokemonsContext;
