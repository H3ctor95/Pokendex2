const express = require('express')
const cors = require('cors')
const axios = require('axios')

const app = express()
app.use(cors())

const cache = {}

app.get('/', (req, res) => {
  res.send('Backend funcionando')
})

app.get('/api/pokemon', async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 30
    const offset = Number(req.query.offset) || 0
    const cacheKey = `list-${limit}-${offset}`

    if (cache[cacheKey]) {
      return res.json(cache[cacheKey])
    }

    const respuesta = await axios.get(
      'https://pokeapi.co/api/v2/pokemon',
      { params: { limit, offset } }
    )

    const lista = respuesta.data

    const pokemon = lista.results.map((item) => {
      const partes = item.url.split('/').filter(Boolean)
      const id = partes[partes.length - 1]

      return {
        id: Number(id),
        name: item.name,
      }
    })

    const data = {
      count: lista.count,
      next: lista.next,
      previous: lista.previous,
      results: pokemon,
    }

    cache[cacheKey] = data
    res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'No se pudo obtener los Pokémon' })
  }
})

app.get('/api/pokemon/:id', async (req, res) => {
  try {
    const id = req.params.id
    const cacheKey = `detail-${id}`

    if (cache[cacheKey]) {
      return res.json(cache[cacheKey])
    }

    const respuesta = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${id}`
    )

    const p = respuesta.data

    const data = {
      id: p.id,
      name: p.name,
      types: p.types.map((t) => t.type.name),
      image:
        p.sprites.other['official-artwork'].front_default ||
        p.sprites.front_default,
      stats: p.stats.map((s) => ({
        name: s.stat.name,
        value: s.base_stat,
      })),
      height: p.height,
      weight: p.weight,
      abilities: p.abilities.map((a) => a.ability.name),
      cry: p.cries?.latest || null,
    }

    cache[cacheKey] = data
    res.json(data)
  } catch (error) {
    if (error.response?.status === 404) {
      return res.status(404).json({ error: 'Pokémon no encontrado' })
    }
    console.error(error)
    res.status(500).json({ error: 'No se pudo obtener el Pokémon' })
  }
})

app.listen(3000, () => {
  console.log('Servidor en puerto 3000')
})
