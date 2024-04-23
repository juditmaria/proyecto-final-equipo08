<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Pelicula;

class PeliculaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Crea una película de ejemplo
        Pelicula::create([
            'titulo' => 'Película de Ejemplo',
            'descripcion' => 'Descripción de la película de ejemplo.',
            'director' => 'Director de Ejemplo',
            'duracion' => 120, // Duración en minutos
            'genero' => 'Género de Ejemplo',
            'ano_estreno' => 2022,
            'trailer' => 'https://www.youtube.com/embed/ABCDEFGHIJK', // URL del tráiler (opcional)
        ]);

        // También puedes usar la factory para crear múltiples películas de prueba
        // Pelicula::factory(10)->create();
    }
}
