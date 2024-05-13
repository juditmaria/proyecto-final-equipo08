<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage; // Agregar la importación de Storage
use App\Models\Promoter;

class PromoterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $promoters = Promoter::all();

        if ($promoters->count() > 0) {
            return response()->json([
                'success' => true,
                'data'    => $promoters
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Promoters not found'
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
            'user_id' => 'required|exists:users,id|unique:promoters,user_id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Validación para la imagen
        ]);

        $promoterData = $request->except('image');

        // Si se carga una imagen, guardarla en el almacenamiento
        if ($request->hasFile('image')) {
            $image = $request->file('image');

            // Guardar la imagen en el disco y obtener la ruta
            $promoterData['image'] = $this->diskSave($image);
        }

        $promoter = Promoter::create($promoterData);

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
        $promoter = Promoter::find($id);

        if (!$promoter) {
            return response()->json([
                'success' => false,
                'message' => 'Promoter not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $promoter
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $promoter = Promoter::find($id);

        if (!$promoter) {
            return response()->json([
                'success' => false,
                'message' => 'Promoter not found'
            ], 404);
        }

        $request->validate([
            'name' => 'required|string',
            'user_id' => 'nullable|exists:users,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Validación para la imagen
        ]);

        $promoterData = $request->except('image');

        // Si se carga una nueva imagen, guardarla en el almacenamiento
        if ($request->hasFile('image')) {
            $image = $request->file('image');

            // Guardar la nueva imagen y eliminar la anterior
            if ($promoter->image) {
                Storage::delete($promoter->image);
            }
            
            $promoterData['image'] = $this->diskSave($image);
        }

        $promoter->update($promoterData);

        return response()->json([
            'success' => true,
            'message' => 'Promoter updated successfully',
            'data' => $promoter
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $promoter = Promoter::find($id);

        if (!$promoter) {
            return response()->json([
                'success' => false,
                'message' => 'Promoter not found'
            ], 404);
        }

        // Eliminar la imagen si existe
        if ($promoter->image) {
            Storage::delete($promoter->image);
        }

        $promoter->delete();

        return response()->json([
            'success' => true,
            'message' => 'Promoter deleted successfully'
        ], 200);
    }

    /**
     * Save the image to disk and return the path.
     */
    private function diskSave($image)
    {
        $fileName = $image->getClientOriginalName();
        
        // Store file at disk
        $uploadName = time() . '_' . $fileName;
        $filePath = $image->storeAs(
            'public/uploads', // Path
            $uploadName       // Filename
        );
        
        return $filePath;
    }
}
