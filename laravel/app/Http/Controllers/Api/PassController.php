<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Pass;

class PassController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $passes = Pass::with(['movie', 'room', 'location'])->get();

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
            'date' => 'required|date',
            'start_time' => 'required|string',
            'location_id' => 'required|exists:locations,id',
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
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $pass = Pass::with(['movie', 'room', 'location'])->find($id);

        if (!$pass) {
            return response()->json([
                'success' => false,
                'message' => 'Pass not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $pass
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'movie_id' => 'required|exists:movies,id',
            'room_id' => 'required|exists:rooms,id',
            'date' => 'required|date',
            'start_time' => 'required|string',
            'location_id' => 'required|exists:locations,id',
        ]);

        $pass = Pass::find($id);

        if (!$pass) {
            return response()->json([
                'success' => false,
                'message' => 'Pass not found'
            ], 404);
        }

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
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $pass = Pass::find($id);

        if (!$pass) {
            return response()->json([
                'success' => false,
                'message' => 'Pass not found'
            ], 404);
        }

        $pass->delete();

        return response()->json([
            'success' => true,
            'message' => 'Pass deleted successfully'
        ], 200);
    }
}
