<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Promoter;
 
class PromoterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Crea un promotor de ejemplo
        Promoter::create([
            'name' => 'Promotor de Ejemplo',
            // Puedes definir aquí el ID del usuario asociado si es necesario
            'user_id' => 1,
        ]);

        // También puedes usar la factory para crear múltiples promotores de prueba
        // Promotor::factory(5)->create();
    }
}
