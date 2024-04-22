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
        Pelicula::factory()->create([
            'título' => 'Película de Ejemplo',
            'descripción' => 'Descripción de la película de ejemplo.',
            'director' => 'Director de Ejemplo',
            'duracion' => 120, // Duración en minutos
            'género' => 'Género de Ejemplo',
            'año_estreno' => 2022,
            'trailer' => 'https://www.youtube.com/embed/ABCDEFGHIJK', // URL del tráiler (opcional)
        ]);

        // También puedes usar la factory para crear múltiples películas de prueba
        // Pelicula::factory(10)->create();
    }
}
