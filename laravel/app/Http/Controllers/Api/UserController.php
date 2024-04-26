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
        try {
            // Validar los datos de la solicitud
            $validatedData = $request->validate([
                'name' => 'required|string',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|string',
                'rol_id' => 'integer|nullable',
                'ticket_id' => 'integer|nullable', // Asegúrate de validar el ticket_id si es necesario
            ]);

            // Si ticket_id no se proporciona en la solicitud, establecerlo en null por defecto
            $userData = array_merge($validatedData, ['ticket_id' => $request->input('ticket_id', null)]);

            // Crear el usuario
            $user = User::create($userData);

            // Devolver una respuesta exitosa con el usuario creado
            return response()->json($user, 201);
        } catch (\Exception $e) {
            // Manejar errores y devolver una respuesta de error con un mensaje específico
            return response()->json([
                'success' => false,
                'message' => 'Error creating user: ' . $e->getMessage(),
            ], 500);
        }
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
