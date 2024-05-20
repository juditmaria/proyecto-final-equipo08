<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\Room;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Room>
 */
class RoomFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Room::class;
    
    public function definition(): array
    {
        return [
            'name' => $this->faker->word,
            'capacity' => $this->faker->numberBetween(50, 200),
            'num_line' => $this->faker->numberBetween(5, 15),
            'num_seat' => $this->faker->numberBetween(5, 15),
            'hour' => $this->faker->time('H:i'),
        ];
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> hotfix-react
