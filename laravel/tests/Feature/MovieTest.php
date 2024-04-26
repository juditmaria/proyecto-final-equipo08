<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class MovieTest extends TestCase
{
    public function test_movie_list()
    {
        // List all movies using API web service
        $response = $this->getJson("/api/movies");
        // Check OK response
        $this->_test_ok($response);
    }
 
    public function test_store_movie()
    {
        // Create movie data
        $movieData = [
            'title' => 'Nueva Película',
            'description' => 'Descripción de la nueva película.',
            'director' => 'Director de la Nueva Película',
            'length' => 100,
            'type' => 'Género de la Nueva Película',
            'release_year' => 2023,
            'trailer' => 'https://www.youtube.com/embed/NEWTRAILER',
        ];

        // Store the movie
        $response = $this->postJson('/api/movies', $movieData);

        // Check created response
        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
            ]);
        
        // Check if the movie is in the database
        $this->assertDatabaseHas('movies', $movieData);
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
