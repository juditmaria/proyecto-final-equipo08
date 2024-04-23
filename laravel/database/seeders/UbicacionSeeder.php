<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Ubicacion;

class UbicacionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Crea una ubicación de ejemplo
        Ubicacion::create([
            'nombre' => 'Ubicación de Ejemplo',
            'direccion' => 'Calle Ejemplo 123',
            'telefono' => '123456789', // Número de teléfono de la ubicación
            'id_promotor' => 1, // ID del promotor asociado
            'id_pase' => 1, // ID del pase asociado
        ]);

        // También puedes usar la factory para crear múltiples ubicaciones de prueba
        // Ubicacion::factory(5)->create();
    }
}
