<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\Ticket;
use App\Models\User;
use App\Models\Pass;
use App\Models\Movie;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ticket>
 */
class TicketFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Ticket::class;

    public function definition(): array
    {
        return [
            'price' => $this->faker->randomFloat(2, 10, 100),
            'user_id' => User::factory(),
            'pass_id' => Pass::factory(),
            'movie_id' => Movie::factory(),
        ];
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> hotfix-react
