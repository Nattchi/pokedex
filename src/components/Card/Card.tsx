import React from "react";
import { Pokemon } from "../../utils/pokeapi";
import "./Card.css";

export default function Card({
  key,
  pokemon,
}: {
  key: number;
  pokemon: Pokemon;
}) {
  return (
    <div className="card">
      <div className="cardImg">
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      </div>
      <h3 className="cardName">{pokemon.name}</h3>
      <div className="cardTypes">
        {pokemon.types.map((type) => {
          return (
            <div key={type.type.name}>
              <span className="TypeName">{type.type.name}</span>
            </div>
          );
        })}
      </div>
      <div className="cardInfo">
        <div className="cardData cardData--weight">
          <p className="title">重さ：{pokemon.weight}</p>
        </div>
        <div className="cardData cardData--height">
          <p className="title">高さ：{pokemon.height}</p>
        </div>
        <div className="cardData cardData--abilities">
          <p className="title">特性：{pokemon.abilities[0].ability.name}</p>
        </div>
      </div>
    </div>
  );
}
