<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Review;
use App\Models\User;
use App\Models\Movie;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $reviews = Review::all();

        if ($reviews->count() > 0) {
            return response()->json([
                'success' => true,
                'data'    => $reviews
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Reviews not found'
            ], 404);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'stars' => 'required|integer|between:1,5',
            'comments' => 'nullable|string',
            'user_id' => 'required|exists:users,id',
            'movie_id' => 'required|exists:movies,id',
        ]);

        $review = Review::create($request->all());

        return response()->json([
            'success' => true,
            'data' => $review
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Review  $review
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Review $review)
    {
        return response()->json([
            'success' => true,
            'data' => $review
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Review  $review
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Review $review)
    {
        $request->validate([
            'stars' => 'required|integer|between:1,5',
            'comments' => 'nullable|string',
            'user_id' => 'required|exists:users,id',
            'movie_id' => 'required|exists:movies,id',
        ]);

        $review->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Review updated successfully',
            'data' => $review
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Review  $review
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Review $review)
    {
        $review->delete();

        return response()->json([
            'success' => true,
            'message' => 'Review deleted successfully'
        ], 200);
    }
}