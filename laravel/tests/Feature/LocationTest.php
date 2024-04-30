<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

use App\Models\Location;

class LocationTest extends TestCase
{
    public function test_location_list()
    {
        // List all locations using API web service
        $response = $this->getJson("/api/locations");
        // Check OK response
        $this->_test_ok($response);
    }
 
    public function test_store_location()
    {
        // Create location data
        $locationData = [
            'name' => 'Nuevo Lugar',
            'direction' => 'Dirección del nuevo lugar',
            'phone' => '123456789',
            'promoter_id' => 1, // Change it to an existing promoter ID if necessary
            'pass_id' => 1, // Change it to an existing pass ID if necessary
        ];

        // Store the location
        $response = $this->postJson('/api/locations', $locationData);

        // Check created response
        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
            ]);

        // Check if the location is in the database
        $this->assertDatabaseHas('locations', $locationData);
    }

    public function test_location_show()
    {
        // Create a sample location
        $location = Location::create([
            'name' => 'Lugar de Ejemplo',
            'direction' => 'Dirección del Lugar de Ejemplo',
            'phone' => '987654321',
            'promoter_id' => 1, // Change it to an existing promoter ID if necessary
            'pass_id' => 1, // Change it to an existing pass ID if necessary
        ]);

        // Consultar un lugar por su ID
        $response = $this->getJson("/api/locations/$location->id");

        // Verificar respuesta OK
        $this->_test_ok($response);
    }

    public function test_location_update()
    {
        // Create a sample location
        $location = Location::create([
            'name' => 'Lugar de Ejemplo',
            'direction' => 'Dirección del Lugar de Ejemplo',
            'phone' => '987654321',
            'promoter_id' => 1, // Change it to an existing promoter ID if necessary
            'pass_id' => 1, // Change it to an existing pass ID if necessary
        ]);

        // Updated location data
        $updatedLocationData = [
            'name' => 'Lugar Actualizado',
            'direction' => 'Nueva Dirección del Lugar',
            'phone' => '123456789',
            'promoter_id' => 1, // Change it to an existing promoter ID if necessary
            'pass_id' => 1, // Change it to an existing pass ID if necessary
        ];

        // Update the location
        $response = $this->putJson("/api/locations/$location->id", $updatedLocationData);

        // Check OK response
        $this->_test_ok($response);
    }

    public function test_location_delete()
    {
        // Create a sample location
        $location = Location::create([
            'name' => 'Lugar de Ejemplo',
            'direction' => 'Dirección del Lugar de Ejemplo',
            'phone' => '987654321',
            'promoter_id' => 1, // Change it to an existing promoter ID if necessary
            'pass_id' => 1, // Change it to an existing pass ID if necessary
        ]);

        // Delete the location
        $response = $this->deleteJson("/api/locations/$location->id");

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
