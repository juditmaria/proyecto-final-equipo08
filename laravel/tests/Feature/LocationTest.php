<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;
use App\Models\Location;
use App\Models\Promoter;
<<<<<<< HEAD
use App\Models\Pass;

class LocationTest extends TestCase
{
    use RefreshDatabase; // Añade la trait RefreshDatabase para restablecer la base de datos antes de cada prueba

    public function test_location_list()
    {
        // Crea registros de promotor y pase
        Location::factory()->create();
        
        // Listar todas las ubicaciones utilizando el servicio web API
        $response = $this->getJson("/api/locations");

        // Verificar respuesta OK
        $response->assertOk();
=======

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
>>>>>>> hotfix-react
    }
 
    public function test_store_location()
    {
<<<<<<< HEAD
        // Crea registros de promotor y pase
        Promoter::factory()->create();
        Pass::factory()->create();
=======
        // Crea un promotor
        $promoter = Promoter::factory()->create();
>>>>>>> hotfix-react

        // Datos de ubicación a almacenar
        $locationData = [
            'name' => 'Nuevo Lugar',
            'direction' => 'Dirección del nuevo lugar',
            'phone' => '123456789',
<<<<<<< HEAD
            'promoter_id' => Promoter::first()->id,
            'pass_id' => Pass::first()->id,
=======
            'promoter_id' => $promoter->id,
            'image' => UploadedFile::fake()->image('test.jpg'), // Imagen de prueba
>>>>>>> hotfix-react
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
                         'image' => 'storage/uploads/' . time() . '_' . $locationData['image']->getClientOriginalName(),
                     ]
                 ]);

<<<<<<< HEAD
=======
        unset($locationData['image']); // La imagen no estará en la base de datos
>>>>>>> hotfix-react
        $this->assertDatabaseHas('locations', $locationData);
    }

    public function test_location_show()
    {
<<<<<<< HEAD
        // Crea un promotor y un pase
        $promoter = Promoter::factory()->create();
        $pass = Pass::factory()->create();

        // Crea una ubicación de ejemplo
        $location = Location::factory()->create([
            'promoter_id' => $promoter->id,
            'pass_id' => $pass->id,
        ]);
=======
        // Crea un promotor y una ubicación de ejemplo
        $promoter = Promoter::factory()->create();
        $location = Location::factory()->create(['promoter_id' => $promoter->id]);
>>>>>>> hotfix-react

        // Consultar una ubicación por su ID
        $response = $this->getJson("/api/locations/{$location->id}");

<<<<<<< HEAD
        // Verificar respuesta OK
        $response->assertOk();
=======
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
>>>>>>> hotfix-react
    }

    public function test_location_update()
    {
<<<<<<< HEAD
        // Crea un promotor y un pase
        $promoter = Promoter::factory()->create();
        $pass = Pass::factory()->create();

        // Crea una ubicación de ejemplo
        $location = Location::factory()->create([
            'promoter_id' => $promoter->id,
            'pass_id' => $pass->id,
        ]);
=======
        // Crea un promotor y una ubicación de ejemplo
        $promoter = Promoter::factory()->create();
        $location = Location::factory()->create(['promoter_id' => $promoter->id]);
>>>>>>> hotfix-react

        // Datos actualizados de la ubicación
        $updatedLocationData = [
            'name' => 'Lugar Actualizado',
            'direction' => 'Nueva Dirección del Lugar',
<<<<<<< HEAD
            'phone' => '123456789',
            'promoter_id' => $promoter->id,
            'pass_id' => $pass->id,
        ];

        // Actualizar la ubicación
        $response = $this->putJson("/api/locations/$location->id", $updatedLocationData);

        // Verificar respuesta OK
        $response->assertOk();
=======
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
                         'image' => 'storage/uploads/' . time() . '_' . $updatedLocationData['image']->getClientOriginalName(),
                     ]
                 ]);

        unset($updatedLocationData['image']); // La imagen no estará en la base de datos
        $this->assertDatabaseHas('locations', $updatedLocationData);
>>>>>>> hotfix-react
    }

    public function test_location_delete()
    {
<<<<<<< HEAD
        // Crea un promotor y un pase
        $promoter = Promoter::factory()->create();
        $pass = Pass::factory()->create();

        // Crea una ubicación de ejemplo
        $location = Location::factory()->create([
            'promoter_id' => $promoter->id,
            'pass_id' => $pass->id,
        ]);

        // Eliminar la ubicación
        $response = $this->deleteJson("/api/locations/$location->id");

        // Verificar respuesta OK
        $response->assertOk();
=======
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
>>>>>>> hotfix-react
    }
}
