<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\Location;
use App\Models\Promoter;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Location>
 */
class LocationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Obtener un promotor y un pase existente
        $promoter = Promoter::factory()->create();

        return [
            'name' => $this->faker->company,
            'direction' => $this->faker->address,
            'phone' => $this->faker->phoneNumber,
            'promoter_id' => $promoter->id,
        ];
    }
}
