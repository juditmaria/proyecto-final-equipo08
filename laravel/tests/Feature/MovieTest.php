<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Illuminate\Http\UploadedFile; // Agregar esta línea

use App\Models\Movie;

class MovieTest extends TestCase
{
    use RefreshDatabase; // Añade la trait RefreshDatabase para restablecer la base de datos antes de cada prueba

    public function test_movie_list()
    {
        // Generar películas de ejemplo
        Movie::factory()->count(3)->create();

        // Listar todas las películas utilizando el servicio web API
        $response = $this->getJson("/api/movies");

        // Verificar respuesta OK
        $response->assertOk();
    }
 
    public function test_store_movie()
    {
        // Generar datos de película utilizando el factory
        $movieData = Movie::factory()->make()->toArray();
<<<<<<< HEAD

        // Almacenar la película
        $response = $this->postJson('/api/movies', $movieData);

=======
        $movieData['image'] = UploadedFile::fake()->image('test.jpg');
    
        // Almacenar la película
        $response = $this->postJson('/api/movies', $movieData);
    
>>>>>>> hotfix-react
        // Verificar respuesta 201 (creado)
        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
            ]);
        
        // Verificar si la película está en la base de datos
<<<<<<< HEAD
=======
        unset($movieData['image']); // La imagen no estará en la base de datos
>>>>>>> hotfix-react
        $this->assertDatabaseHas('movies', $movieData);
    }
    
    
    public function test_movie_show()
    {
<<<<<<< HEAD
        // Generar una película de ejemplo
=======
>>>>>>> hotfix-react
        $movie = Movie::factory()->create();

        $response = $this->getJson("/api/movies/{$movie->id}");

<<<<<<< HEAD
        // Verificar respuesta OK
=======
>>>>>>> hotfix-react
        $response->assertOk();
    }
    

    public function test_movie_update()
    {
        // Generar una película de ejemplo
        $movie = Movie::factory()->create();
<<<<<<< HEAD

        // Generar datos actualizados de la película utilizando el factory
        $updatedMovieData = Movie::factory()->make()->toArray();

        // Actualizar la película
        $response = $this->putJson("/api/movies/$movie->id", $updatedMovieData);

=======
    
        // Generar datos actualizados de la película utilizando el factory
        $updatedMovieData = Movie::factory()->make()->toArray();
        $updatedMovieData['image'] = UploadedFile::fake()->image('updated_image.jpg');
    
        // Actualizar la película
        $response = $this->putJson("/api/movies/{$movie->id}", $updatedMovieData);
    
>>>>>>> hotfix-react
        // Verificar respuesta OK
        $response->assertOk();
    }
    

    public function test_movie_delete()
    {
        // Generar una película de ejemplo
        $movie = Movie::factory()->create();

        // Eliminar la película
        $response = $this->deleteJson("/api/movies/$movie->id");

        // Verificar respuesta OK
        $response->assertOk();
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
