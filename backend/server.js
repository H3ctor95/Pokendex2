const express = require('express')
const cors = require('cors')
const axios = require('axios')

const app = express()
app.use(cors())

app.get('/', (req, res) => {
  res.send('Backend funcionando')
})

app.get('/api/pokemon', async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 30
    const offset = Number(req.query.offset) || 0
    const respuesta = await axios.get(
      'https://pokeapi.co/api/v2/pokemon',
      {
        params: { limit, offset }
      }
    )

    const lista = respuesta.data

    const pokemon = lista.results.map((item) => {
      const partes = item.url.split('/').filter(Boolean)
      const id = partes[partes.lenght - 1]

      return {
        count: lista.count,
        next: lista.next,
        previous: lista.previous,
        result: pokemon
      }
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'No se pudo obtener los Pokémon' })
  }
})

app.listen(3000, () => {
  console.log('Servidor en puerto 3000')
})