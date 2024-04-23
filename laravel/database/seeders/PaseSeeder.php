<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Pase;

class PaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Crea un pase de ejemplo
        Pase::create([
            'id_pelicula' => 1, // ID de la película asociada
            'id_sala' => 1, // ID de la sala asociada
            'fecha' => '2024-04-30', // Fecha del pase
            'hora_inicio' => '15:00', // Hora de inicio del pase
        ]);

        // También puedes usar la factory para crear múltiples pases de prueba
        // Pase::factory(10)->create();
    }
}
