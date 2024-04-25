<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Ticket;

class TicketSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Crea una entrada de ejemplo
        Ticket::create([
            'price' => 10.50, // Precio de la entrada
            'user_id' => 1, // ID del usuario asociado
            'pass_id' => 1, // ID del pase asociado
            'movie_id' => 1, // ID de la película asociada
        ]);

        // También puedes usar la factory para crear múltiples entradas de prueba
        // Entrada::factory(10)->create();
    }
}
