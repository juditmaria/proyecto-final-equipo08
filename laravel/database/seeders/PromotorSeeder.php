<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Promotor; // Importa el modelo Promotor

class PromotorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Crea un promotor de ejemplo
        Promotor::create([
            'nombre' => 'Promotor de Ejemplo',
            // Puedes definir aquí el ID del usuario asociado si es necesario
            'id_usuario' => 1,
        ]);

        // También puedes usar la factory para crear múltiples promotores de prueba
        // Promotor::factory(5)->create();
    }
}
