<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\User;

use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = new User([
            'name'      => config('admin.name'),
            'email'     => config('admin.email'),
            'password'  => Hash::make(config('admin.password')), // Hashear la contraseña antes de guardarla
            'rol_id'    => 1, // Definir el rol del usuario según tus necesidades
        ]);

        $admin->save();

        // También puedes usar la factory para crear múltiples usuarios de prueba
        // User::factory(10)->create();
    }
}
