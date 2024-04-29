<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

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
            'user_id' => 1, // Change it to an existing user ID if necessary
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
