<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\Movie;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Movie>
 */
class MovieFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
     protected $model = Movie::class;

    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph,
            'director' => $this->faker->name,
            'length' => $this->faker->numberBetween(60, 240),
            'type' => $this->faker->randomElement(['action', 'comedy', 'drama', 'horror', 'science fiction']),
            'release_year' => $this->faker->numberBetween(1980, 2022),
            'trailer' => $this->faker->url,
        ];
    }
}