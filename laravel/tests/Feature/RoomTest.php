<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

use App\Models\Room;

class RoomTest extends TestCase
{
    use RefreshDatabase; // Añade la trait RefreshDatabase para restablecer la base de datos antes de cada prueba

    public function test_room_list()
    {
        // Crea registros de promotor y pase
        Room::factory()->create();

        // List all rooms using API web service
        $response = $this->getJson("/api/rooms");
        // Check OK response
        $this->_test_ok($response);
    }

    public function test_room_store()
    {
        // Create room data
        $roomData = [
            'name' => 'playa 2',
            'capacity' => 60,
            'num_line' => 6,
            'num_seat' => 10,
            'hour' => '20:30',
        ];

        // Store the room
        $response = $this->postJson('/api/rooms', $roomData);

        // Check created response
        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
            ]);

        // Check if the room is in the database
        $this->assertDatabaseHas('rooms', $roomData);
    }

    public function test_room_show()
    {
        // Create an example room using factory
        $room = Room::factory()->create();

        // Get a room by its ID
        $response = $this->getJson("/api/rooms/$room->id");

        // Check OK response
        $this->_test_ok($response);
    }

    public function test_room_update()
    {
        // Create an example room using factory
        $room = Room::factory()->create();

        // Update the room using factory
        $updatedData = Room::factory()->make()->toArray();

        $response = $this->putJson("/api/rooms/$room->id", $updatedData);

        // Check OK response
        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => $updatedData
            ]);

        // Check if the room is updated in the database
        $this->assertDatabaseHas('rooms', $updatedData);
    }

    public function test_room_delete()
    {
        // Create an example room using factory
        $room = Room::factory()->create();

        // Delete the room
        $response = $this->deleteJson("/api/rooms/$room->id");

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
        // Check if the response data is an array (only for successful requests and if data exists)
        if ($status === 200 || $status === 201) {
            if ($response->getData()->data ?? false) {
                // Check JSON dynamic values
                $response->assertJsonPath("data",
                    fn ($data) => is_array($data)
                );
            }
        }
    }
}