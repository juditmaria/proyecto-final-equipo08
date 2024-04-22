<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Sala;

class SalaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Crea una sala de ejemplo
        Sala::factory()->create([
            'nombre' => 'Sala de Ejemplo',
            'capacidad' => 100, // Capacidad de la sala
            'num_fila' => 10, // Número de filas
            'num_asiento' => 10, // Número de asientos por fila
            'hora' => '10:00', // Hora de funcionamiento (opcional)
        ]);

        // También puedes usar la factory para crear múltiples salas de prueba
        // Sala::factory(5)->create();
    }
}
