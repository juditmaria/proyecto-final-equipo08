<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;

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

            // Crear una nueva instancia de Profile
            $profile = new Profile($profileData);

            // Guardar la imagen en el disco y obtener la ruta
            $profile->diskSave($image);
        } else {
            // Si no se carga ninguna imagen, crear el perfil sin imagen
            $profile = Profile::create($profileData);
        }

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
            $image = $request->file('image');

            // Guardar la nueva imagen y eliminar la anterior
            if ($profile->image) {
                Storage::delete($profile->image);
            }
            
            $profile->diskSave($image);
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
            Storage::delete($profile->image);
        }

        $profile->delete();

        return response()->json([
            'success' => true,
            'message' => 'Profile deleted successfully'
        ], 200);
    }
}

