<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Usuario;

use Illuminate\Support\Facades\Hash;


class UsuarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    
    public function run()
    {
        $admin = new Usuario([
            'nombre'    => config('admin.name'),
            'email'     => config('admin.email'),
            'contrasena'  => Hash::make(config('admin.password')), // Hashear la contraseña antes de guardarla
            'id_rol'    => 1, // Definir el rol del usuario según tus necesidades
        ]);

        $admin->save();

        // También puedes usar la factory para crear múltiples usuarios de prueba
        // User::factory(10)->create();
    }
}