<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Entrada;

class EntradaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Crea una entrada de ejemplo
        Entrada::create([
            'precio' => 10.50, // Precio de la entrada
            'id_usuario' => 1, // ID del usuario asociado
            'id_pase' => 1, // ID del pase asociado
            'id_pelicula' => 1, // ID de la película asociada
        ]);

        // También puedes usar la factory para crear múltiples entradas de prueba
        // Entrada::factory(10)->create();
    }
}
