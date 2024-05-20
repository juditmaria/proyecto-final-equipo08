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
    use RefreshDatabase; // Añade la trait RefreshDatabase para restablecer la base de datos antes de cada prueba

    public function test_pass_list()
    {
<<<<<<< HEAD
        // Generar pases de ejemplo
        Pass::factory()->count(3)->create();

        // Listar todos los pases utilizando el servicio web API
        $response = $this->getJson("/api/passes");

        // Verificar respuesta OK
=======
        Pass::factory()->count(3)->create();

        $response = $this->getJson("/api/passes");

>>>>>>> hotfix-react
        $response->assertOk();
    }

    public function test_store_pass()
    {
<<<<<<< HEAD
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
=======
        $passData = Pass::factory()->make()->toArray();

        $response = $this->postJson('/api/passes', $passData);

        $response->assertStatus(201)
                 ->assertJson(['success' => true]);

>>>>>>> hotfix-react
        $this->assertDatabaseHas('passes', $passData);
    }

    public function test_pass_show()
    {
<<<<<<< HEAD
        // Generar un pase de ejemplo
=======
>>>>>>> hotfix-react
        $pass = Pass::factory()->create();

        $response = $this->getJson("/api/passes/{$pass->id}");

<<<<<<< HEAD
        // Verificar respuesta OK
=======
>>>>>>> hotfix-react
        $response->assertOk();
    }

    public function test_pass_update()
    {
<<<<<<< HEAD
        // Generar un pase de ejemplo
        $pass = Pass::factory()->create();

        // Generar datos actualizados de pase utilizando el factory
        $updatedPassData = Pass::factory()->make()->toArray();

        // Actualizar el pase
        $response = $this->putJson("/api/passes/$pass->id", $updatedPassData);

        // Verificar respuesta OK
=======
        $pass = Pass::factory()->create();

        $updatedPassData = Pass::factory()->make()->toArray();

        $response = $this->putJson("/api/passes/{$pass->id}", $updatedPassData);

>>>>>>> hotfix-react
        $response->assertOk();
    }

    public function test_pass_delete()
    {
<<<<<<< HEAD
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
=======
        $pass = Pass::factory()->create();

        $response = $this->deleteJson("/api/passes/{$pass->id}");

        $response->assertOk();
>>>>>>> hotfix-react
    }
}
