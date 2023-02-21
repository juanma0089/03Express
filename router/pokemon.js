'use strict'

const express = require('express');
const router = express.Router();
const Pokemon = require('../models/Pokemon');

router.get('/', async (req,res) => {

    try {
        const arrayPokemonDB = await Pokemon.find();
        console.log(arrayPokemonDB);
        res.render('pokemon', {
            arrayPokemon: arrayPokemonDB
        })
    } catch (error) {
        console.error(error)
    }
    
})


router.get('/crear',(req,res) => {
    res.render('crear')
    })

router.post('/', async (req,res) => {
    const body = req.body //gracias al body parser, de esta forma
    //podemos recuperar todo lo que viene del body
    console.error(body)//comprobamos en pantalla
    try {
        const pokemonDB = new Pokemon(body);
        //creamos un nuevo Pokemon, gracias al modelo
        await pokemonDB.save()
        res.redirect('/pokemon')

    } catch (error) {
        console.error(error)
    }
    
})

router.get('/:id', async (req,res) => {
    const id = req.params.id
    try {
        const pokemonDB = await Pokemon.findOne({_id: id});
        console.log(pokemonDB);
        res.render('detalle', {
            pokemon:pokemonDB,
            error: false
        })
    } catch (error) {
        console.error('Se ha producido un error',error)
        res.render('detalle',{
            error: true,
            mensaje: 'Pokémon no encontrado!'
        })
    }
    
})

router.delete('/:id', async (req,res) => {
    const id = req.params.id
    try {
        const pokemonDB = await Pokemon.findByIdAndDelete({_id: id});
        console.log(pokemonDB);
       if(!pokemonDB){
        res.json({
            estado: false,
            mensaje: 'No se puede eliminar el Pokémon'
        })
    }else {
        res.json({
            estado: true,
            mensaje: 'Pokémon eliminado'
        })
    }
        
    } catch (error) {
        console.error(error)
    }
    
})

router.put('/:id', async (req,res) => {
    const id = req.params.id;
    const body = req.body;
    try {
        const pokemonDB = await Pokemon.findByIdAndUpdate(
            id, body, {userFindAndModify: false}
            )
        console.log(pokemonDB)
        res.json({
            estado: true,
            mensaje: 'Pokémon editado'
        })  
    } catch (error) {
        console.error(error)
        res.json({
            estado: false,
            mensaje: 'Problema al editar el Pokémon'
        }) 
    }
    
})

module.exports = router;
