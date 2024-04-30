<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Pass;
use App\Models\Movie;
use App\Models\Room;

class PassController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $passes = Pass::all();

        if ($passes->count() > 0) {
            return response()->json([
                'success' => true,
                'data'    => $passes
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Passes not found'
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
            'movie_id' => 'required|exists:movies,id',
            'room_id' => 'required|exists:rooms,id',
            'date' => 'required|date_format:Y-m-d',
            'start_time' => 'required|string',
        ]);

        $pass = Pass::create($request->all());

        return response()->json([
            'success' => true,
            'data' => $pass
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Pass  $pass
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Pass $pass)
    {
        return response()->json([
            'success' => true,
            'data' => $pass
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Pass  $pass
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Pass $pass)
    {
        $request->validate([
            'movie_id' => 'required|exists:movies,id',
            'room_id' => 'required|exists:rooms,id',
            'date' => 'required|date_format:Y-m-d',
            'start_time' => 'required|string',
        ]);

        $pass->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Pass updated successfully',
            'data' => $pass
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Pass  $pass
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Pass $pass)
    {
        $pass->delete();

        return response()->json([
            'success' => true,
            'message' => 'Pass deleted successfully'
        ], 200);
    }
}
