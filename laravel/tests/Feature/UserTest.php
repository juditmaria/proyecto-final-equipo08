<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserTest extends TestCase
{
    public function test_user_list()
   {
       // List all users using API web service
       $response = $this->getJson("/api/users");
       // Check OK response
       $this->_test_ok($response);
   }

   public function test_user_create()
   {
       // Create a new user using API web service
       $userData = [
           'name' => 'Test User',
           'email' => 'test@example.com',
           'password' => 'password',
           'rol_id' => true,
       ];

       $response = $this->postJson("/api/users", $userData);
       // Check successful creation response
       $response->assertStatus(201)
           ->assertJson([
               'success' => true,
           ]);

       // Check if the user was actually created in the database
       $this->assertDatabaseHas('users', [
           'email' => 'test@example.com',
           'rol_id' => 1,
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
