<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Location;

class LocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Crea una ubicación de ejemplo
        Location::create([
            'name' => 'Ubicación de Ejemplo',
            'direction' => 'Calle Ejemplo 123',
            'phone' => '123456789', // Número de teléfono de la ubicación
            'promoter_id' => 1, // ID del promotor asociado
            'pass_id' => 1, // ID del pase asociado
            'image' => 'public/ejemplo.jpg', // Ruta de la imagen de ejemplo
        ]);

        // También puedes usar la factory para crear múltiples ubicaciones de prueba
        // Ubicacion::factory(5)->create();
    }
}
