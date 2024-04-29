<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Promoter;

class PromoterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $promoter = Promoter::all();

        if ($promoter->count() > 0) {
            return response()->json([
                'success' => true,
                'data'    => $promoter
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
            'name' => 'required|string',
            'user_id' => 'nullable|exists:users,id',
        ]);

        $promoter = Promoter::create($request->all());

        return response()->json([
            'success' => true,
            'data' => $promoter
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
