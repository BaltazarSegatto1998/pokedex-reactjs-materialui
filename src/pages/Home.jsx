import { Grid, Skeleton } from '@mui/material'
import { Container } from '@mui/system'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import PokemonCard from '../components/PokemonCard'

export const Home = () => {

    const [pokemons, setPokemons] = useState([])

    useEffect(() => {
        getPokemons()   ;
    },[])

    const getPokemons = () => {
        var endpoints = []
        for (var i = 1; i < 200; i++) {
            endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`)
        }

     axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then((res) => {
        setPokemons(res)
      })
      .catch((erro) => {
        console.log(erro)
      })
    };

    const pokemonFilter = (name) => {
        let filterPokemons = []
        if (name === "") {
            getPokemons()
        }
        for (var i in  pokemons) {
            if(pokemons[i].data.name.includes(name)) {
                filterPokemons.push(pokemons[i]);
            }
        }
         setPokemons(filterPokemons)

    }



  return (
    <div>
        <Navbar pokemonFilter={pokemonFilter}/>
        <Container maxWidth="false">
            <Grid container spacing={2}>
                {pokemons.length === 0 ? <span>Carregando</span> :  (  pokemons.map((pokemon, key) => (
                    <Grid key={key} item sm={6} xs={12} lg={2} md={4}>
                    <PokemonCard name={pokemon.data.name} image={pokemon.data.sprites.front_default} types={pokemon.data.types}/>
                    </Grid>
                )) 
                 )}
              
            </Grid>
     
        </Container>
        
    </div>
  )
}
