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
        // Crear un usuario con rol_id especificado como 1 y ticket_id como null
        $userData =[
            'name' => 'John Doe4',
            'email' => 'john@example4.com',
            'password' => 'password',
            'rol_id' => '1',
            'ticket_id' => null,
        ];

        // Verificar que la respuesta sea exitosa (código de estado HTTP 201)
        $response = $this->postJson('/api/users', $userData);

        // Check created response
        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
            ]);
        
        // Check if the movie is in the database
        $this->assertDatabaseHas('users', $userData);
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