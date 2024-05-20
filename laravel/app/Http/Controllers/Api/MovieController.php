<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;

use App\Models\Movie;

class MovieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $movies = Movie::all();

        if ($movies->count() > 0) {
            return response()->json([
                'success' => true,
                'data'    => $movies
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
            'title' => 'required|string',
            'description' => 'required|string',
            'director' => 'required|string',
            'length' => 'required|integer',
            'type' => 'required|string',
            'release_year' => 'required|integer',
            'trailer' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Validación para la imagen
        ]);

        $movieData = $request->except('image');

        // Si se carga una imagen, guardarla en el almacenamiento
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->storeAs('public/uploads', $imageName);
            $movieData['image'] = 'storage/uploads/' . $imageName;
        }

        $movie = Movie::create($movieData);

        return response()->json([
            'success' => true,
            'data' => $movie
        ], 201);
    }

    public function show(string $id)
    {
        $movie = Movie::find($id);

        if (!$movie) {
            return response()->json([
                'success' => false,
                'message' => 'Movie not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $movie
        ], 200);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
{
    $movie = Movie::find($id);

    if (!$movie) {
        return response()->json([
            'success' => false,
            'message' => 'Movie not found'
        ], 404);
    }

    $request->validate([
        'title' => 'required|string',
        'description' => 'required|string',
        'director' => 'required|string',
        'length' => 'required|integer',
        'type' => 'required|string',
        'release_year' => 'required|integer',
        'trailer' => 'nullable|string',
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048', // Validación para la imagen
    ]);

    $movieData = $request->except('image');

    // Si se carga una nueva imagen, guardarla en el almacenamiento
    if ($request->hasFile('image')) {
        $image = $request->file('image');
        $imageName = time() . '_' . $image->getClientOriginalName();
        $image->storeAs('public/uploads', $imageName);
        $movieData['image'] = 'storage/uploads/' . $imageName;
    }

    $movie->update($movieData);

    return response()->json([
        'success' => true,
        'message' => 'Movie updated successfully',
        'data' => $movie
    ], 200);
}



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $movie = Movie::find($id);
        
        if (!$movie) {
            return response()->json([
                'success' => false,
                'message' => 'Movie not found'
            ], 404);
        }

        // Eliminar la imagen si existe
        if ($movie->image) {
            Storage::delete('public/uploads/' . $movie->image);
        }

        $movie->delete();

        return response()->json([
            'success' => true,
            'message' => 'Movie deleted successfully'
        ], 200);
    }
}
