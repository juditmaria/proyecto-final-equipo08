<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

use App\Models\User;

class UserTest extends TestCase
{
    public function test_user_list()
   {
       // List all users using API web service
       $response = $this->getJson("/api/users");
       // Check OK response
       $this->_test_ok($response);
   }

   public function test_create_user()
    {
        // Crear un usuario con rol_id especificado como true
        $response = $this->postJson('/api/users', [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => 'password',
            'rol_id' => true, // Especificar el rol_id como true
        ]);

        // Verificar que la respuesta sea exitosa
        $response->assertStatus(201);

        // Verificar que el usuario se haya creado en la base de datos con rol_id especificado como true
        $this->assertDatabaseHas('users', [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'rol_id' => true,
        ]);

        // Crear un usuario sin especificar rol_id
        $response = $this->postJson('/api/users', [
            'name' => 'Jane Doe',
            'email' => 'jane@example.com',
            'password' => 'password',
        ]);

        // Verificar que la respuesta sea exitosa
        $response->assertStatus(201);

        // Verificar que el usuario se haya creado en la base de datos con rol_id predeterminado (false)
        $this->assertDatabaseHas('users', [
            'name' => 'Jane Doe',
            'email' => 'jane@example.com',
            'rol_id' => false,
        ]);
    }

   protected function _test_ok($response, $status = 200)
   {
       // Check JSON response
       $response->assertStatus($status);
       // Check JSON properties
       $response->assertJson([
           "success" => true,
       ]);
       // Check JSON dynamic values
       $response->assertJsonPath("data",
           fn ($data) => is_array($data)
       );
   }
}
