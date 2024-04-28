<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

/*         User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]); */

        $this->call(UserSeeder::class);
        $this->call(PromoterSeeder::class);
        $this->call(MovieSeeder::class);
        $this->call(RoomSeeder::class);
        $this->call(PassSeeder::class);
        $this->call(TicketSeeder::class);
        $this->call(LocationSeeder::class);
        $this->call(ReviewSeeder::class);
    }
}