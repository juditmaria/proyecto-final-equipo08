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
            'password'  => Hash::make(config('admin.password')),// Hashear la contraseña antes de guardarla
            'role'     => 1,
        ]);

        $admin->save();

        $ejemplo1 = new User([
            'name'      => 'ejemplo1',
            'email'     => 'ejemplo1@gmail.com',
            'password'  => Hash::make('123456789'), // Hashear la contraseña antes de guardarla
            'role'     => 0,
        ]);

        $ejemplo1->save();

        $ejemplo2 = new User([
            'name'      => 'ejemplo2',
            'email'     => 'ejemplo2@gmail.com',
            'password'  => Hash::make('123456789'), // Hashear la contraseña antes de guardarla
            'role'     => 0,
        ]);

        $ejemplo2->save();

        // También puedes usar la factory para crear múltiples usuarios de prueba
        // User::factory(2)->create();
    }
}