<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;
use App\Models\Location;
use App\Models\Promoter;

class LocationTest extends TestCase
{
    use RefreshDatabase;

    public function test_location_list()
    {
        // Crea registros de promotor y ubicación
        Location::factory()->count(3)->create();

        // Listar todas las ubicaciones utilizando el servicio web API
        $response = $this->getJson("/api/locations");

        // Verificar respuesta OK y estructura JSON
        $response->assertOk()
                 ->assertJsonStructure([
                     'success',
                     'data' => [
                         '*' => ['id', 'name', 'direction', 'phone', 'promoter_id', 'image', 'created_at', 'updated_at']
                     ]
                 ]);
    }
 
    public function test_store_location()
    {
        // Crea un promotor
        $promoter = Promoter::factory()->create();

        // Datos de ubicación a almacenar
        $locationData = [
            'name' => 'Nuevo Lugar',
            'direction' => 'Dirección del nuevo lugar',
            'phone' => '123456789',
            'promoter_id' => $promoter->id,
            'image' => UploadedFile::fake()->image('test.jpg'), // Imagen de prueba
        ];

        // Almacenar la ubicación
        $response = $this->postJson('/api/locations', $locationData);

        // Verificar respuesta 201 (creado) y si la ubicación está en la base de datos
        $response->assertStatus(201)
                 ->assertJson([
                     'success' => true,
                     'data' => [
                         'name' => 'Nuevo Lugar',
                         'direction' => 'Dirección del nuevo lugar',
                         'phone' => '123456789',
                         'promoter_id' => $promoter->id,
                         'image' => 'public/uploads/' . time() . '_' . $locationData['image']->getClientOriginalName(),
                     ]
                 ]);

        unset($locationData['image']); // La imagen no estará en la base de datos
        $this->assertDatabaseHas('locations', $locationData);
    }

    public function test_location_show()
    {
        // Crea un promotor y una ubicación de ejemplo
        $promoter = Promoter::factory()->create();
        $location = Location::factory()->create(['promoter_id' => $promoter->id]);

        // Consultar una ubicación por su ID
        $response = $this->getJson("/api/locations/{$location->id}");

        // Verificar respuesta OK y datos correctos
        $response->assertOk()
                 ->assertJson([
                     'success' => true,
                     'data' => [
                         'id' => $location->id,
                         'name' => $location->name,
                         'direction' => $location->direction,
                         'phone' => $location->phone,
                         'promoter_id' => $promoter->id,
                         'image' => $location->image,
                     ]
                 ]);
    }

    public function test_location_update()
    {
        // Crea un promotor y una ubicación de ejemplo
        $promoter = Promoter::factory()->create();
        $location = Location::factory()->create(['promoter_id' => $promoter->id]);

        // Datos actualizados de la ubicación
        $updatedLocationData = [
            'name' => 'Lugar Actualizado',
            'direction' => 'Nueva Dirección del Lugar',
            'phone' => '987654321',
            'promoter_id' => $promoter->id,
            'image' => UploadedFile::fake()->image('updated_image.jpg'), // Imagen de prueba actualizada
        ];

        // Actualizar la ubicación
        $response = $this->putJson("/api/locations/{$location->id}", $updatedLocationData);

        // Verificar respuesta OK y datos actualizados
        $response->assertOk()
                 ->assertJson([
                     'success' => true,
                     'message' => 'Location updated successfully',
                     'data' => [
                         'id' => $location->id,
                         'name' => 'Lugar Actualizado',
                         'direction' => 'Nueva Dirección del Lugar',
                         'phone' => '987654321',
                         'promoter_id' => $promoter->id,
                         'image' => 'public/uploads/' . time() . '_' . $updatedLocationData['image']->getClientOriginalName(),
                     ]
                 ]);

        unset($updatedLocationData['image']); // La imagen no estará en la base de datos
        $this->assertDatabaseHas('locations', $updatedLocationData);
    }

    public function test_location_delete()
    {
        // Crea un promotor y una ubicación de ejemplo
        $promoter = Promoter::factory()->create();
        $location = Location::factory()->create(['promoter_id' => $promoter->id]);

        // Eliminar la ubicación
        $response = $this->deleteJson("/api/locations/{$location->id}");

        // Verificar respuesta OK y si la ubicación fue eliminada
        $response->assertOk()
                 ->assertJson([
                     'success' => true,
                     'message' => 'Location deleted successfully'
                 ]);

        $this->assertDatabaseMissing('locations', ['id' => $location->id]);
    }
}
