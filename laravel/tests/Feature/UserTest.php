<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

use Illuminate\Support\Facades\Hash;

use App\Models\User;

class UserTest extends TestCase
{
    public function test_user_list()
   {
        // Crea registros de promotor y pase
        User::factory()->create();

       // List all users using API web service
       $response = $this->getJson("/api/users");
       // Check OK response
       $this->_test_ok($response);
   }

   public function test_user_create()
    {
        // Create user data with hashed password
        $userData = [
            'name' => 'Ejemplo 11',
            'email' => 'ejemplo11@gmail.com',
            'password' => Hash::make('123456789'), // Hashear la contraseña antes de enviarla al test
        ];

        // Store the user
        $response = $this->postJson('/api/users', $userData);

        // Check created response
        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
            ]);
        
        // Check if the user is in the database
        $this->assertDatabaseHas('users', [
            'name' => 'Ejemplo 11',
            'email' => 'ejemplo11@gmail.com',
        ]);
    }

    public function test_user_read()
    {
        $user = User::create([
            'name' => 'Promotor de Ejemplo',
            'email' => 'example4@gmail.com',
            'password' => '123456789',
            'ticket_id' => 1,
        ]);

        // Consultar un promotor por su ID
        $response = $this->getJson("/api/users/$user->id");

        // Verificar respuesta OK
        $this->_test_ok($response);
    }

    public function test_user_update()
    {
        // Crear un promotor de ejemplo
        $user = User::create([
            'name' => 'Ejemplo 12',
            'email' => 'ejemplo12@gmail.com',
            'password' => Hash::make('123456789'),
        ]);

        // Datos actualizados del promotor
        $updatedUserData = [
            'name' => 'Ejemplo 13',
            'email' => 'ejemplo13@gmail.com',
            'password' => Hash::make('123456789'),
        ];

        // Actualizar el promotor
        $response = $this->putJson("/api/users/$user->id", $updatedUserData);

        // Verificar respuesta OK
        $this->_test_ok($response);
    }

   public function test_user_destroy()
   {
      // Crear un usuario de ejemplo
      $user = User::create([
        'name' => 'Usuario de Ejemplo',
        'email' => 'example@gmail.com',
        'password' => '123456789',
    ]);

    // Eliminar el usuario
    $response = $this->deleteJson("/api/users/$user->id");

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