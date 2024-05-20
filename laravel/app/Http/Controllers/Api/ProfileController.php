<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Profile;

class ProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $profiles = Profile::all();

        if ($profiles->count() > 0) {
            return response()->json([
                'success' => true,
                'data'    => $profiles
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Profiles not found'
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|integer',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Validación para la imagen
        ]);

        $profileData = $request->except('image');

        // Si se carga una imagen, guardarla en el almacenamiento
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->storeAs('public/uploads', $imageName);
            $profileData['image'] = 'storage/uploads/' . $imageName;
        }

        $profile = Profile::create($profileData);

        return response()->json([
            'success' => true,
            'data' => $profile
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $profile = Profile::find($id);

        if (!$profile) {
            return response()->json([
                'success' => false,
                'message' => 'Profile not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $profile
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $profile = Profile::find($id);

        if (!$profile) {
            return response()->json([
                'success' => false,
                'message' => 'Profile not found'
            ], 404);
        }

        $request->validate([
            'user_id' => 'required|integer',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Validación para la imagen
        ]);

        $profileData = $request->except('image');

        // Si se carga una nueva imagen, guardarla en el almacenamiento
        if ($request->hasFile('image')) {
            // Eliminar la imagen anterior si existe
            if ($profile->image) {
                Storage::delete('public/uploads/' . $profile->image);
            }

            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->storeAs('public/uploads', $imageName);
            $profileData['image'] = 'storage/uploads/' . $imageName;
        }

        $profile->update($profileData);

        return response()->json([
            'success' => true,
            'message' => 'Profile updated successfully',
            'data' => $profile
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $profile = Profile::find($id);

        if (!$profile) {
            return response()->json([
                'success' => false,
                'message' => 'Profile not found'
            ], 404);
        }

        // Eliminar la imagen si existe
        if ($profile->image) {
            Storage::delete('public/uploads/' . $profile->image);
        }

        $profile->delete();

        return response()->json([
            'success' => true,
            'message' => 'Profile deleted successfully'
        ], 200);
    }
}
