<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Review;

class ReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Crea una review de ejemplo
        Review::create([
            'stars' => 4, // Número de estrellas de la review
            'comments' => '¡Una película increíble!', // Comentarios sobre la película
            'user_id' => 1, // ID del usuario que hizo la review
            'movie_id' => 1, // ID de la película asociada a la review
        ]);

        // También puedes usar la factory para crear múltiples reviews de prueba
        // Review::factory(10)->create();
    }
}