"use client"

import { MainLayout } from "@/layouts"
import { getSingleMovie } from "@/services/moviess"
import { FakeMovies } from "@/types/fakeMovies"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from '@/components/Button'


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function MovieDetail() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [movie, setMovie] = useState<FakeMovies>()

  const params = useParams()
  const { id_product } = params

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const singleMovieData = await getSingleMovie(id_product)
        setMovie(singleMovieData)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching movie:", error)
        setIsLoading(false)
      }
    }

    fetchMovie()
  }, [id_product])


  return (
    <MainLayout>
      {isLoading ? (
        <h1 className="text-white text-3xl">Cargando...</h1>
      ) : (
      
          
        
        <article className=" py-20">
        <div className="max-w-6xl mx-auto lg:px-60">
        <h1 className="text-3xl font-bold text-white mb-4">{movie?.id} PELICULA</h1>
          <Card className="w-[450px] bg-indigo-400 ">
            <CardHeader>
              <div>
                <p className="text-black mb-2">MOVIE:</p>
                <CardTitle className="text-black mb-6">{movie?.movie}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-black mb-2">
              <p className="text-black mb-2">RATING:</p>
              <CardTitle className="text-black mb-6">{movie?.rating} </CardTitle>
              <p className="text-black mb-2">LINK:</p>
              <CardTitle className="text-black mb-6"><a href={movie?.imdb_url} target='_blank'>{movie?.imdb_url}</a></CardTitle>
            </CardContent>
            <CardFooter>
              <Button
                    className="text-white bg-indigo-600 rounded-md px-9 py-5 "
                    href={`/movies`}
                  >
                    Volver
                  </Button>
            </CardFooter>
          </Card>
        </div>
        </article>
      )}
    </MainLayout>
  )
}