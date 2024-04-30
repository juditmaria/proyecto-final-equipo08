<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Review;
use App\Models\User;
use App\Models\Movie;

class ReviewTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_review_list()
    {
        // List all reviews using API web service
        $response = $this->getJson("/api/reviews");
        // Check OK response
        $this->_test_ok($response);
    }

    public function test_store_review()
    {
        // Create review data
        $reviewData = [
            'stars' => 4,
            'comments' => 'This is a test review',
            'user_id' => 1, // Change it to an existing user ID if necessary
            'movie_id' => 1, // Change it to an existing movie ID if necessary
        ];

        // Store the review
        $response = $this->postJson('/api/reviews', $reviewData);

        // Check created response
        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
            ]);

        // Check if the review is in the database
        $this->assertDatabaseHas('reviews', $reviewData);
    }

    public function test_review_show()
    {
        // Create a sample review
        $review = Review::create([
            'stars' => 4,
            'comments' => 'This is a test review',
            'user_id' => 1, // Change it to an existing user ID if necessary
            'movie_id' => 1, // Change it to an existing movie ID if necessary
        ]);

        // Consultar un review por su ID
        $response = $this->getJson("/api/reviews/$review->id");

        // Verificar respuesta OK
        $this->_test_ok($response);
    }

    public function test_review_update()
    {
        // Create a sample review
        $review = Review::create([
            'stars' => 4,
            'comments' => 'This is a test review',
            'user_id' => 1, // Change it to an existing user ID if necessary
            'movie_id' => 1, // Change it to an existing movie ID if necessary
        ]);

        // Updated review data
        $updatedReviewData = [
            'stars' => 5,
            'comments' => 'This is an updated test review',
            'user_id' => 2, // Change it to an existing user ID if necessary
            'movie_id' => 2, // Change it to an existing movie ID if necessary
        ];

        // Update the review
        $response = $this->putJson("/api/reviews/$review->id", $updatedReviewData);

        // Check OK response
        $this->_test_ok($response);
    }

    public function test_review_delete()
    {
        // Create a sample review
        $review = Review::create([
            'stars' => 4,
            'comments' => 'This is a test review',
            'user_id' => 1, // Change it to an existing user ID if necessary
            'movie_id' => 1, // Change it to an existing movie ID if necessary
        ]);

        // Delete the review
        $response = $this->deleteJson("/api/reviews/$review->id");

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