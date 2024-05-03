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
    use RefreshDatabase; // Añade la trait RefreshDatabase para restablecer la base de datos antes de cada prueba

    public function test_pass_list()
    {
        // Generar pases de ejemplo
        Pass::factory()->count(3)->create();

        // Listar todos los pases utilizando el servicio web API
        $response = $this->getJson("/api/passes");

        // Verificar respuesta OK
        $response->assertOk();
    }

    public function test_store_pass()
    {
        // Generar datos de pase utilizando el factory
        $passData = Pass::factory()->make()->toArray();

        // Almacenar el pase
        $response = $this->postJson('/api/passes', $passData);

        // Verificar respuesta 201 (creado)
        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
            ]);
        
        // Verificar si el pase está en la base de datos
        $this->assertDatabaseHas('passes', $passData);
    }

    public function test_pass_show()
    {
        // Generar un pase de ejemplo
        $pass = Pass::factory()->create();

        // Consultar un pase por su ID
        $response = $this->getJson("/api/passes/$pass->id");

        // Verificar respuesta OK
        $response->assertOk();
    }

    public function test_pass_update()
    {
        // Generar un pase de ejemplo
        $pass = Pass::factory()->create();

        // Generar datos actualizados de pase utilizando el factory
        $updatedPassData = Pass::factory()->make()->toArray();

        // Actualizar el pase
        $response = $this->putJson("/api/passes/$pass->id", $updatedPassData);

        // Verificar respuesta OK
        $response->assertOk();
    }

    public function test_pass_delete()
    {
        // Generar un pase de ejemplo
        $pass = Pass::factory()->create();

        // Eliminar el pase
        $response = $this->deleteJson("/api/passes/$pass->id");

        // Verificar respuesta OK
        $response->assertOk();
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
