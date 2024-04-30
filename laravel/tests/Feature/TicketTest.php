<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

use App\Models\Ticket;

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

    public function test_ticket_show()
    {
        // Create a sample ticket
        $ticket = Ticket::create([
            'price' => 20.5,
            'user_id' => 1, // Change it to an existing user ID if necessary
            'pass_id' => 1, // Change it to an existing pass ID if necessary
            'movie_id' => 1, // Change it to an existing movie ID if necessary
        ]);

        // Get a ticket by its ID
        $response = $this->getJson("/api/tickets/$ticket->id");

        // Check OK response
        $this->_test_ok($response);
    }

    public function test_ticket_update()
    {
        // Create a sample ticket
        $ticket = Ticket::create([
            'price' => 20.5,
            'user_id' => 1, // Cambia a un ID de usuario existente si es necesario
            'pass_id' => 1, // Cambia a un ID de pase existente si es necesario
            'movie_id' => 1, // Cambia a un ID de película existente si es necesario
        ]);

        // Updated ticket data
        $updatedTicketData = [
            'price' => 25.75,
            'user_id' => 1, // Cambia a un ID de usuario existente si es necesario
            'pass_id' => 1, // Cambia a un ID de pase existente si es necesario
            'movie_id' => 1, // Cambia a un ID de película existente si es necesario
        ];

        // Update the ticket
        $response = $this->putJson("/api/tickets/$ticket->id", $updatedTicketData);

        // Check OK response
        $this->_test_ok($response);
    }

    public function test_ticket_delete()
    {
        // Create a sample ticket
        $ticket = Ticket::create([
            'price' => 20.5,
            'user_id' => 1, // Cambia a un ID de usuario existente si es necesario
            'pass_id' => 1, // Cambia a un ID de pase existente si es necesario
            'movie_id' => 1, // Cambia a un ID de película existente si es necesario
        ]);

        // Delete the ticket
        $response = $this->deleteJson("/api/tickets/$ticket->id");

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
