<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

use App\Models\Promoter;

class PromoterTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_promoter_list()
    {
        // List all users using API web service
        $response = $this->getJson("/api/promoters");
        // Check OK response
        $this->_test_ok($response);
    }
 
    public function test_store_promoter()
    {
        // Create promoter data
        $promoterData = [
            'name' => 'Nuevo Promotor',
            'user_id' => 2, // Change it to an existing user ID if necessary
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
    
    public function test_promoter_show()
    {
        // Create a sample promoter
        $promoter = Promoter::create([
            'name' => 'Promotor de Ejemplo',
            'user_id' => 3, // Change it to an existing user ID if necessary
        ]);

        // Consultar un promotor por su ID
        $response = $this->getJson("/api/promoters/$promoter->id");

        // Verificar respuesta OK
        $this->_test_ok($response);
    }

    public function test_promoter_update()
    {
        // Crear un promotor de ejemplo
        $promoter = Promoter::create([
            'name' => 'Promotor de Ejemplo',
            'user_id' => 1, // Cambia a un ID de usuario existente si es necesario
        ]);

        // Datos actualizados del promotor
        $updatedPromoterData = [
            'name' => 'Promotor Actualizado',
            'user_id' => 2, // Cambia a un ID de usuario existente si es necesario
        ];

        // Actualizar el promotor
        $response = $this->putJson("/api/promoters/$promoter->id", $updatedPromoterData);

        // Verificar respuesta OK
        $this->_test_ok($response);
    }

    public function test_promoter_delete()
    {
        // Crear un promotor de ejemplo
        $promoter = Promoter::create([
            'name' => 'Promotor de Ejemplo',
            'user_id' => 1, // Cambia a un ID de usuario existente si es necesario
        ]);

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
