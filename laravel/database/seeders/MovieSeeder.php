<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Movie;

class MovieSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Crea una película de ejemplo
        Movie::create([
            'title' => 'Película de Ejemplo',
            'description' => 'Descripción de la película de ejemplo.',
            'director' => 'Director de Ejemplo',
            'length' => 120, // Duración en minutos
            'type' => 'Género de Ejemplo',
            'release_year' => 2022,
            'trailer' => 'https://www.youtube.com/embed/ABCDEFGHIJK', // URL del tráiler (opcional)
            'image' => 'storage/ejemplo.jpg', // Ruta de la imagen de ejemplo
        ]);

        // También puedes usar la factory para crear múltiples películas de prueba
        // Pelicula::factory(10)->create();
    }
}
