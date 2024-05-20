<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Pass;

class PassSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Crea un pase de ejemplo
        Pass::create([
            'movie_id' => 1, // ID de la película asociada
            'room_id' => 1, // ID de la sala asociada
            'date' => '2024-04-30', // Fecha del pase
            'start_time' => '15:00', // Hora de inicio del pase
            'location_id' => 1, // ID de la ubicación asociada
        ]);

        // También puedes usar la factory para crear múltiples pases de prueba
        // Pase::factory(10)->create();
    }
}