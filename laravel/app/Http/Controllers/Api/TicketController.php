<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Ticket;

class TicketController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $ticket = Ticket::all();

        if ($ticket->count() > 0) {
            return response()->json([
                'success' => true,
                'data'    => $ticket
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
            'price' => 'required|numeric',
            'user_id' => 'required|exists:users,id',
            'pass_id' => 'required|exists:passes,id',
            'movie_id' => 'required|exists:movies,id',
        ]);

        $ticket = Ticket::create($request->all());

        return response()->json([
            'success' => true,
            'data' => $ticket
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
