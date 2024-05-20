<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\Promoter;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Promoter>
 */
class PromoterFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Promoter::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->name,
            'user_id' => function () {
                return User::factory()->create()->id;
            }
        ];
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> hotfix-react
