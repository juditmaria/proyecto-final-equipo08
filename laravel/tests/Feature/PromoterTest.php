<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

use App\Models\Promoter;
use App\Models\User;

class PromoterTest extends TestCase
{
    use RefreshDatabase; // Añade la trait RefreshDatabase para restablecer la base de datos antes de cada prueba

    /**
     * A basic feature test example.
     */
    public function test_promoter_list()
    {
        // Crea registros de promotor y pase
        Promoter::factory()->create();

        // List all promoters using API web service
        $response = $this->getJson("/api/promoters");
        // Check OK response
        $this->_test_ok($response);
    }
 
    public function test_promoter_store()
    {
        //User create
        $user = User::factory()->create();

        // Create promoter data
        $promoterData = [
            'name' => 'Nuevo Promotor',
            'user_id' => $user->id, // Change it to an existing user ID if necessary
        ];

        // Store the promoter
        $response = $this->postJson('/api/promoters', $promoterData);

        // Check created response
        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
            ]);
        
        // Check if the promoter is in the database
        $this->assertDatabaseHas('promoters', $promoterData);
    }
    
    public function test_promoter_read()
    {
        // Create a sample promoter using factory
        $promoter = Promoter::factory()->create();

        // Consultar un promotor por su ID
        $response = $this->getJson("/api/promoters/$promoter->id");

        // Verificar respuesta OK
        $this->_test_ok($response);
    }

    public function test_promoter_update()
    {
        // Crear un promotor de ejemplo usando factory
        $promoter = Promoter::factory()->create();

        // Datos actualizados del promotor
        $updatedPromoterData = Promoter::factory()->make()->toArray();

        // Actualizar el promotor
        $response = $this->putJson("/api/promoters/$promoter->id", $updatedPromoterData);

        // Verificar respuesta OK
        $this->_test_ok($response);
    }

    public function test_promoter_delete()
    {
        // Crear un promotor de ejemplo usando factory
        $promoter = Promoter::factory()->create();

        // Eliminar el promotor
        $response = $this->deleteJson("/api/promoters/$promoter->id");

        // Verificar respuesta OK
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