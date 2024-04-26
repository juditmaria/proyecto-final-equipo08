<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Room;

class RoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $rooms = Room::all();

        if ($rooms->count() > 0) {
            return response()->json([
                'success' => true,
                'data'    => $rooms
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Files not found'
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'capacity' => 'required|integer',
            'num_line' => 'required|integer',
            'num_seat' => 'required|integer',
            'hour' => 'required',
        ]);

        $room = Room::create($request->all());

        return response()->json([
            'success' => true,
            'data' => $room
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $room = Room::find($id);

        if (!$room) {
            return response()->json([
                'success' => false,
                'message' => 'Room not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $room
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
