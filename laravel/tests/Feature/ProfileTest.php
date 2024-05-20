<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Illuminate\Http\UploadedFile; // Agregar esta línea

use App\Models\Profile;

class ProfileTest extends TestCase
{
    use RefreshDatabase; // Añade la trait RefreshDatabase para restablecer la base de datos antes de cada prueba

    public function test_profile_list()
    {
        // Generar perfiles de ejemplo
        Profile::factory()->count(3)->create();

        // Listar todos los perfiles utilizando el servicio web API
        $response = $this->getJson("/api/profiles");

        // Verificar respuesta OK
        $response->assertOk();
    }
 
    public function test_store_profile()
    {
        // Generar datos de perfil utilizando el factory
        $profileData = Profile::factory()->make()->toArray();
        $profileData['image'] = UploadedFile::fake()->image('test.jpg');
    
        // Almacenar el perfil
        $response = $this->postJson('/api/profiles', $profileData);
    
        // Verificar respuesta 201 (creado)
        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
            ]);
        
        // Verificar si el perfil está en la base de datos
        unset($profileData['image']); // La imagen no estará en la base de datos
        $this->assertDatabaseHas('profiles', $profileData);
    }
    
    
    public function test_profile_show()
    {
        $profile = Profile::factory()->create();

        $response = $this->getJson("/api/profiles/{$profile->id}");

        $response->assertOk();
    }
    

    public function test_profile_update()
    {
        // Generar un perfil de ejemplo
        $profile = Profile::factory()->create();
    
        // Generar datos actualizados del perfil utilizando el factory
        $updatedProfileData = Profile::factory()->make()->toArray();
        $updatedProfileData['image'] = UploadedFile::fake()->image('updated_image.jpg');
    
        // Actualizar el perfil
        $response = $this->putJson("/api/profiles/{$profile->id}", $updatedProfileData);
    
        // Verificar respuesta OK
        $response->assertOk();
    }
    

    public function test_profile_delete()
    {
        // Generar un perfil de ejemplo
        $profile = Profile::factory()->create();

        // Eliminar el perfil
        $response = $this->deleteJson("/api/profiles/$profile->id");

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

