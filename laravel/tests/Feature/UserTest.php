<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserTest extends TestCase
{
    /**
     * A basic feature test example.
     */
   /*  public function test_example(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    } */

    public function test_user_list()
   {
       // List all users using API web service
       $response = $this->getJson("/api/users");
       // Check OK response
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
       // Check JSON dynamic values
       $response->assertJsonPath("data",
           fn ($data) => is_array($data)
       );
   }
}
