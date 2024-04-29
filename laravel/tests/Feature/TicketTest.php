<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class TicketTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_ticket_list()
    {
        // List all users using API web service
        $response = $this->getJson("/api/tickets");
        // Check OK response
        $this->_test_ok($response);
    }
 

    public function test_store_ticket()
    {
        // Create ticket data
        $ticketData = [
            'price' => 20.5,
            'user_id' => 1, // Change it to an existing user ID if necessary
            'pass_id' => 1, // Change it to an existing pass ID if necessary
            'movie_id' => 1, // Change it to an existing movie ID if necessary
        ];

        // Store the ticket
        $response = $this->postJson('/api/tickets', $ticketData);

        // Check created response
        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
            ]);
        
        // Check if the ticket is in the database
        $this->assertDatabaseHas('tickets', $ticketData);
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
