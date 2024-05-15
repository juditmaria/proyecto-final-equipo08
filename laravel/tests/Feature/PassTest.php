<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Pass;
use App\Models\Movie;
use App\Models\Room;
use App\Models\Location;

class PassTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_pass_list()
    {
        Pass::factory()->count(3)->create();

        $response = $this->getJson("/api/passes");

        $response->assertOk();
    }

    public function test_store_pass()
    {
        $passData = Pass::factory()->make()->toArray();

        $response = $this->postJson('/api/passes', $passData);

        $response->assertStatus(201)
                 ->assertJson(['success' => true]);

        $this->assertDatabaseHas('passes', $passData);
    }

    public function test_pass_show()
    {
        $pass = Pass::factory()->create();

        $response = $this->getJson("/api/passes/{$pass->id}");

        $response->assertOk();
    }

    public function test_pass_update()
    {
        $pass = Pass::factory()->create();

        $updatedPassData = Pass::factory()->make()->toArray();

        $response = $this->putJson("/api/passes/{$pass->id}", $updatedPassData);

        $response->assertOk();
    }

    public function test_pass_delete()
    {
        $pass = Pass::factory()->create();

        $response = $this->deleteJson("/api/passes/{$pass->id}");

        $response->assertOk();
    }
}
