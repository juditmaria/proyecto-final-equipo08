<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Pass;
use App\Models\Movie;
use App\Models\Room;

class PassTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_pass_list()
    {
        // List all passes using API web service
        $response = $this->getJson("/api/passes");
        // Check OK response
        $this->_test_ok($response);
    }

    public function test_store_pass()
    {
        // Create pass data
        $passData = [
            'movie_id' => 1, // Change it to an existing movie ID if necessary
            'room_id' => 1, // Change it to an existing room ID if necessary
            'date' => '2024-05-01',
            'start_time' => '18:00',
        ];

        // Store the pass
        $response = $this->postJson('/api/passes', $passData);

        // Check created response
        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
            ]);

        // Check if the pass is in the database
        $this->assertDatabaseHas('passes', $passData);
    }

    public function test_pass_show()
    {
        // Create a sample pass
        $pass = Pass::create([
            'movie_id' => 1, // Change it to an existing movie ID if necessary
            'room_id' => 1, // Change it to an existing room ID if necessary
            'date' => '2024-05-01',
            'start_time' => '18:00',
        ]);

        // Consultar un pase por su ID
        $response = $this->getJson("/api/passes/$pass->id");

        // Verificar respuesta OK
        $this->_test_ok($response);
    }

    public function test_pass_update()
    {
        // Create a sample pass
        $pass = Pass::create([
            'movie_id' => 1, // Change it to an existing movie ID if necessary
            'room_id' => 1, // Change it to an existing room ID if necessary
            'date' => '2024-05-01',
            'start_time' => '18:00',
        ]);

        // Updated pass data
        $updatedPassData = [
            'movie_id' => 1, // Change it to an existing movie ID if necessary
            'room_id' => 1, // Change it to an existing room ID if necessary
            'date' => '1000-05-02',
            'start_time' => '20:00',
        ];

        // Update the pass
        $response = $this->putJson("/api/passes/$pass->id", $updatedPassData);

        // Check OK response
        $this->_test_ok($response);
    }

    public function test_pass_delete()
    {
        // Create a sample pass
        $pass = Pass::create([
            'movie_id' => 1, // Change it to an existing movie ID if necessary
            'room_id' => 1, // Change it to an existing room ID if necessary
            'date' => '2024-05-01',
            'start_time' => '18:00',
        ]);

        // Delete the pass
        $response = $this->deleteJson("/api/passes/$pass->id");

        // Check OK response
        $this->_test_ok($response);
    }

    protected function _test_ok($response, $status = 200)
    {
        // Check JSON response
        $response->assertStatus($status);
        // Check JSON properties
        $response->assertJson([
            "success" => true,
        ]);
    }
}
