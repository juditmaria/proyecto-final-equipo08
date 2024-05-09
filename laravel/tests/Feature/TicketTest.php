<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

use App\Models\Ticket;
use App\Models\User;
use App\Models\Pass;
use App\Models\Movie;

class TicketTest extends TestCase
{
    use RefreshDatabase; // Añade la trait RefreshDatabase para restablecer la base de datos antes de cada prueba

    public function test_ticket_list()
    {
        // Crea registros de promotor y pase
        Ticket::factory()->create();

        // List all tickets using API web service
        $response = $this->getJson("/api/tickets");
        // Check OK response
        $this->_test_ok($response);
    }
 

    public function test_store_ticket()
    {
        //User create
        $user = User::factory()->create();
         //User create
        $pass = Pass::factory()->create();
          //User create
        $movie = Movie::factory()->create();

        // Create ticket data
        $ticketData = [
            'price' => 20.5,
            'user_id' => $user->id, // Change it to an existing user ID if necessary
            'pass_id' => $pass->id, // Change it to an existing pass ID if necessary
            'movie_id' => $movie->id, // Change it to an existing movie ID if necessary
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
        // Create a sample ticket using factory
        $ticket = Ticket::factory()->create();

        // Get a ticket by its ID
        $response = $this->getJson("/api/tickets/$ticket->id");

        // Check OK response
        $this->_test_ok($response);
    }

    public function test_ticket_update()
    {
        // Create a sample ticket using factory
        $ticket = Ticket::factory()->create();

        // Update the ticket using factory
        $updatedData = Ticket::factory()->make()->toArray();

        $response = $this->putJson("/api/tickets/$ticket->id", $updatedData);

        // Check OK response
        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => $updatedData
            ]);

        // Check if the ticket is updated in the database
        $this->assertDatabaseHas('tickets', $updatedData);
    }

    public function test_ticket_delete()
    {
        // Create a sample ticket using factory
        $ticket = Ticket::factory()->create();

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