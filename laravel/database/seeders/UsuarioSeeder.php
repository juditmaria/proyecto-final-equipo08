<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UsuarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Crea un usuario de ejemplo
        User::factory()->create([
            'nombre' => 'Usuario de Ejemplo',
            'email' => 'usuario@example.com',
            'id_rol' => 1, // Definir el valor de id_rol según tus necesidades
        ]);

        // También puedes usar la factory para crear múltiples usuarios de prueba
        // User::factory(10)->create();
    }
}