<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UsuarioSeeder::class);
        $this->call(PromotorSeeder::class);
        $this->call(PeliculaSeeder::class);
        $this->call(SalaSeeder::class);
        $this->call(PaseSeeder::class);
        $this->call(UbicacionSeeder::class);
        $this->call(EntradaSeeder::class);
        $this->call(ValoracionSeeder::class);
    }
}