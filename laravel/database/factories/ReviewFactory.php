<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\Review;
use App\Models\User;
use App\Models\Movie;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Review>
 */
class ReviewFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Review::class;

    public function definition(): array
    {
        return [
            'stars' => $this->faker->numberBetween(1, 5),
            'comments' => $this->faker->paragraph,
            'user_id' => function () {
                return User::factory()->create()->id;
            },
            'movie_id' => function () {
                return Movie::factory()->create()->id;
            },
        ];
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> hotfix-react
