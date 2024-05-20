<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\Pass;
use App\Models\Movie;
use App\Models\Room;
<<<<<<< HEAD
=======
use App\Models\Location;
>>>>>>> hotfix-react

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pass>
 */
class PassFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Pass::class;

    public function definition(): array
    {
        return [
            'movie_id' => Movie::factory()->create()->id,
            'room_id' => Room::factory()->create()->id,
<<<<<<< HEAD
            'date' => $this->faker->date(),
            'start_time' => $this->faker->time(),
        ];
    }
}
=======
            'location_id' => Location::factory(),
            'date' => $this->faker->date(),
            'start_time' => $this->faker->time(),
            'location_id' => Location::factory()->create()->id,
        ];
    }
}
>>>>>>> hotfix-react
