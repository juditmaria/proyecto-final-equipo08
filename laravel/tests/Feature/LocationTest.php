<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

use App\Models\Location;
use App\Models\Promoter;
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
    }
 
    public function test_store_location()
    {
        // Crea registros de promotor y pase
        Promoter::factory()->create();
        Pass::factory()->create();

        // Datos de ubicación a almacenar
        $locationData = [
            'name' => 'Nuevo Lugar',
            'direction' => 'Dirección del nuevo lugar',
            'phone' => '123456789',
            'promoter_id' => Promoter::first()->id,
            'pass_id' => Pass::first()->id,
        ];

        // Almacenar la ubicación
        $response = $this->postJson('/api/locations', $locationData);

        // Verificar respuesta 201 (creado) y si la ubicación está en la base de datos
        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
            ]);

        $this->assertDatabaseHas('locations', $locationData);
    }

    public function test_location_show()
    {
        // Crea un promotor y un pase
        $promoter = Promoter::factory()->create();
        $pass = Pass::factory()->create();

        // Crea una ubicación de ejemplo
        $location = Location::factory()->create([
            'promoter_id' => $promoter->id,
            'pass_id' => $pass->id,
        ]);

        // Consultar un lugar por su ID
        $response = $this->getJson("/api/locations/$location->id");

        // Verificar respuesta OK
        $response->assertOk();
    }

    public function test_location_update()
    {
        // Crea un promotor y un pase
        $promoter = Promoter::factory()->create();
        $pass = Pass::factory()->create();

        // Crea una ubicación de ejemplo
        $location = Location::factory()->create([
            'promoter_id' => $promoter->id,
            'pass_id' => $pass->id,
        ]);

        // Datos actualizados de la ubicación
        $updatedLocationData = [
            'name' => 'Lugar Actualizado',
            'direction' => 'Nueva Dirección del Lugar',
            'phone' => '123456789',
            'promoter_id' => $promoter->id,
            'pass_id' => $pass->id,
        ];

        // Actualizar la ubicación
        $response = $this->putJson("/api/locations/$location->id", $updatedLocationData);

        // Verificar respuesta OK
        $response->assertOk();
    }

    public function test_location_delete()
    {
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
    }
}