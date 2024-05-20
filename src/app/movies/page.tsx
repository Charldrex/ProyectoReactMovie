"use client"

import { Button } from '@/components/Button'
import { MainLayout } from '@/layouts'
import { getMovies } from '@/services/moviess'
import { FakeMovies } from '@/types/fakeMovies'
import React, { useEffect, useState } from 'react'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import axios from 'axios'

export default function Movies() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [movies, setMovies] = useState<FakeMovies[]>([]);



  const [data, setData] = useState([])
  const [movie, setMovie] = useState('')
  const [rating, setRating] = useState('')
  const [editId, setEditID] = useState(-1)



  function getMoviesFunc() {
    getMovies().then((res) => {
      console.log(res.data)
      setMovies(res.data)
      setIsLoading(false)
    }).catch((err) => {
      console.log(err)
      setIsLoading(false)
    })
  }

  useEffect(() => {
    getMoviesFunc()
  }, [])

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const id = data.length + 1;
    axios.post('https://dummyapi.online/api/movies', { id: id, movie: movie, rating: rating })
      .then(res => {
        location.reload()
      })
      .catch(er => console)
  }



  return (
    <MainLayout  >

      <div>
        <h1 className="text-3xl font-bold text-white mb-4">TODAS LAS PELICULAS</h1>

        <div>
          <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-2 gap-5'>
              <div className='flex flex-col gap-3 m-8'>
                <input type="text" placeholder='Enter Movie' onChange={e => setMovie(e.target.value)} />
                <input type="text" placeholder='Enter Rating' onChange={e => setRating(e.target.value)} />
              </div>
              <div className='flex flex-col gap-3 m-8'>
                <Button
                  type="submit"
                  className='bg-indigo-400'
                  size="lg"
                  isLoading={false}>
                  Guardar
                </Button>
              </div>

            </div>
          </form>
        </div>

        <div className="rounded-md border bg-indigo-400">
          <Table className=''>
            <TableHeader>
              <TableRow>
                <TableHead className='text-black'>ID</TableHead>
                <TableHead className='text-black'>MOVIE</TableHead>
                <TableHead className='text-black'>RATING</TableHead>
                <TableHead className='text-black'>URL</TableHead>
                <TableHead className='text-black'>ACCIONES</TableHead>
                <TableHead className='text-black'>EDITAR</TableHead>
                <TableHead className='text-black'>ELIMINAR</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className='text-white'>
              {movies.map((movie: FakeMovies) => (
                <TableRow key={movie.id.toString()}>
                  <TableCell>{movie.id}</TableCell>
                  <TableCell>{movie.movie}</TableCell>
                  <TableCell>{movie.rating}</TableCell>
                  <TableCell>{movie.imdb_url}</TableCell>
                  <TableCell>
                    <Button
                      className="text-white bg-indigo-600 rounded-md px-2 py-1"
                      href={`/movies/detail/${movie.id}`}
                    >
                      Ver
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button className="text-white bg-indigo-600 rounded-md px-2 py-1" >
                      Editar
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      className="text-white bg-indigo-600 rounded-md px-2 py-1"
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

      </div>
    </MainLayout>)
}
