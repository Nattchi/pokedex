import React, { SetStateAction, useEffect, useState } from "react";
import "./App.css";
import { getAllPokemon, getPokemon } from "./utils/pokemon";
import { Pokemon } from "./utils/pokeapi";
import Card from "./components/Card/Card";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const initailURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [prevURL, setPrevURL] = useState("");
  const [nextURL, setNextURL] = useState("");

  useEffect(() => {
    const fetchPokemonData = async () => {
      // Get All Pokemon Data
      let res = (await getAllPokemon(initailURL)) as any;
      // Get Detail Data of Each Pokemon
      loadPokemon(res.results);
      setPrevURL(res.previous);
      setNextURL(res.next);
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  const loadPokemon = async (data: any) => {
    let _pokemonData = (await Promise.all(
      data.map((pokemon: { url: string }) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    )) as SetStateAction<never[]>;

    setPokemonData(_pokemonData);
  };

  const handlePrevPage = async () => {
    if (!prevURL) return;

    setLoading(true);
    let data = (await getAllPokemon(prevURL)) as any;
    await loadPokemon(data.results);
    setPrevURL(data.previous);
    setNextURL(data.next);
    setLoading(false);
  };

  const handleNextPage = async () => {
    if (!nextURL) return;

    setLoading(true);
    let data = (await getAllPokemon(nextURL)) as any;
    await loadPokemon(data.results);
    setPrevURL(data.previous);
    setNextURL(data.next);
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="App">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <div className="pokemonCardContainer">
              {pokemonData.map((pokemon: Pokemon, i: number) => {
                return <Card key={i} pokemon={pokemon} />;
              })}
            </div>
            <div className="button">
              <button onClick={handlePrevPage}>前へ</button>
              <button onClick={handleNextPage}>次へ</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
