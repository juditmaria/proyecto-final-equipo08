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
        // Crea registros de promotor
        Promoter::factory()->create();

        // Listar todos los promotores usando el servicio web API
        $response = $this->getJson("/api/promoters");
        // Verificar respuesta OK
        $this->_test_ok($response);
    }
 
    public function test_promoter_store()
    {
        // Crear un usuario
        $user = User::factory()->create();

        // Crear datos del promotor
        $promoterData = [
            'name' => 'Nuevo Promotor',
            'user_id' => $user->id, // Cambiar a un ID de usuario existente si es necesario
            'image' => null, // Ajusta según tus necesidades
        ];

        // Almacenar el promotor
        $response = $this->postJson('/api/promoters', $promoterData);

        // Verificar respuesta creada
        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
            ]);
        
        // Verificar si el promotor está en la base de datos
        $this->assertDatabaseHas('promoters', $promoterData);
    }
    
    public function test_promoter_read()
    {
        // Crear un promotor de ejemplo
        $promoter = Promoter::factory()->create();

        // Consultar un promotor por su ID
        $response = $this->getJson("/api/promoters/$promoter->id");

        // Verificar respuesta OK
        $this->_test_ok($response);
    }

    public function test_promoter_update()
    {
        // Crear un promotor de ejemplo
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
        // Crear un promotor de ejemplo
        $promoter = Promoter::factory()->create();

        // Eliminar el promotor
        $response = $this->deleteJson("/api/promoters/$promoter->id");

        // Verificar respuesta OK
        $this->_test_ok($response);
    }

    protected function _test_ok($response, $status = 200)
    {
        // Verificar respuesta JSON
        $response->assertStatus($status);
        // Verificar propiedades JSON
        $response->assertJson([
            "success" => true,
        ]);
        // Verificar si los datos de respuesta son un array (solo para solicitudes exitosas y si existen datos)
        if ($status === 200 || $status === 201) {
            if ($response->getData()->data ?? false) {
                // Verificar valores dinámicos JSON
                $response->assertJsonPath("data",
                    fn ($data) => is_array($data)
                );
            }
        }
    }
}
