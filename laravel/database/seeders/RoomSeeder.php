<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Room;

class RoomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Crea una sala de ejemplo
        Room::create([
            'name' => 'Sala de Ejemplo',
            'capacity' => 100, // Capacidad de la sala
            'num_line' => 10, // Número de filas
            'num_seat' => 10, // Número de asientos por fila
            'hour' => '10:00', // Hora de funcionamiento (opcional)
        ]);

        // También puedes usar la factory para crear múltiples salas de prueba
        // Sala::factory(5)->create();
    }
}