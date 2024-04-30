<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Location;

class LocationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $locations = Location::all();

        if ($locations->count() > 0) {
            return response()->json([
                'success' => true,
                'data'    => $locations
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
            'direction' => 'required|string',
            'phone' => 'required|string',
            'promoter_id' => 'required|exists:promoters,id',
            'pass_id' => 'required|exists:passes,id',
        ]);

        $location = Location::create($request->all());

        return response()->json([
            'success' => true,
            'data' => $location
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $location = Location::find($id);

        if (!$location) {
            return response()->json([
                'success' => false,
                'message' => 'Location not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $location
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $location = Location::find($id);

        if (!$location) {
            return response()->json([
                'success' => false,
                'message' => 'Location not found'
            ], 404);
        }

        $request->validate([
            'name' => 'required|string',
            'direction' => 'required|string',
            'phone' => 'required|string',
            'promoter_id' => 'required|exists:promoters,id',
            'pass_id' => 'required|exists:passes,id',
        ]);

        $location->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Location updated successfully',
            'data' => $location
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $location = Location::find($id);

        if (!$location) {
            return response()->json([
                'success' => false,
                'message' => 'Location not found'
            ], 404);
        }

        $location->delete();

        return response()->json([
            'success' => true,
            'message' => 'Location deleted successfully'
        ], 200);
    }
}
