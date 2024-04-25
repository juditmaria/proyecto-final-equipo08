<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\User;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();

        if ($users->count() > 0) {
            return response()->json([
                'success' => true,
                'data'    => $users
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
        // Validar los datos de la solicitud
        $validatedData = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string',
            'rol_id' => 'nullable|boolean', // Permitir que rol_id sea opcional y booleano
        ]);
    
        // Convertir rol_id a 1 si es true
        $rol_id = $request->input('rol_id', false);
        if ($rol_id === true) {
            $rol_id = 1;
        }
    
        // Si rol_id no se proporciona en la solicitud, establecerlo en false por defecto
        $userData = array_merge($validatedData, ['rol_id' => $rol_id]);
    
        // Crear el usuario
        $user = User::create($userData);
    
        // Devolver una respuesta exitosa
        return response()->json($user, 201);
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
