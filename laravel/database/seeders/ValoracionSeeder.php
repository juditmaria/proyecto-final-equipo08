<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Valoracion;

class ValoracionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Crea una valoración de ejemplo
        Valoracion::create([
            'estrellas' => 5, // Número de estrellas de la valoración
            'comentario' => '¡Excelente película!', // Comentario opcional
            'id_usuario' => 1, // ID del usuario asociado
            'id_pelicula' => 1, // ID de la película asociada
        ]);

        // También puedes usar la factory para crear múltiples valoraciones de prueba
        // Valoracion::factory(5)->create();
    }
}