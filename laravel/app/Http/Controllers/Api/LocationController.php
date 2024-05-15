<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage; 
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
                'message' => 'Locations not found'
            ], 404);
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
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Validación para la imagen
        ]);

        $locationData = $request->except('image');

        // Si se carga una imagen, guardarla en el almacenamiento
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->storeAs('public/uploads', $imageName);
            $locationData['image'] = 'public/uploads/' . $imageName;
        }

        $location = Location::create($locationData);

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
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Validación para la imagen
        ]);

        $locationData = $request->except('image');

        // Si se carga una nueva imagen, guardarla en el almacenamiento
        if ($request->hasFile('image')) {
            // Eliminar la imagen anterior si existe
            if ($location->image) {
                Storage::delete($location->image);
            }

            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->storeAs('public/uploads', $imageName);
            $locationData['image'] = 'public/uploads/' . $imageName;
        }

        $location->update($locationData);

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

        // Eliminar la imagen si existe
        if ($location->image) {
            Storage::delete($location->image);
        }

        $location->delete();

        return response()->json([
            'success' => true,
            'message' => 'Location deleted successfully'
        ], 200);
    }
}
