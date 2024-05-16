<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Http\Controllers\Api\TokenTest;

use Carbon\Carbon;

class TokenController extends Controller
{
    public function user(Request $request)
    {
        // Obtener el usuario autenticado
        $user = $request->user();

        // Verificar si el usuario está autenticado
        if ($user) {
            // Obtener el token del usuario
            $token = $user->currentAccessToken();

            // Verificar si el token existe y es válido
            if ($token && $user->tokenCan('api')) {
                // Verificar la fecha de expiración del token
                $isTokenValid = $token->expires_at > now();

                // Devolver la respuesta
                return response()->json([
                    'success' => true,
                    'user' => [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'created_at' => $user->created_at,
                        'updated_at' => $user->updated_at,
                    ],
                    'is_token_valid' => $isTokenValid
                ]);
            }
        }

        // En caso de que el usuario no esté autenticado o el token no sea válido
        return response()->json([
            'success' => false,
            'message' => 'Usuario no autenticado o token inválido.'
        ], 401);
    }

    public function register(Request $request)
    {
        // Validar la solicitud
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
        ]);
    
        // Crear el usuario de prueba
        $user = new User([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password), // Asegúrate de encriptar la contraseña
        ]);
        
        // Guardar el usuario en la base de datos
        $user->save();
    
        // Crear un token para el usuario recién registrado
        $token = $user->createToken('authToken')->plainTextToken;
        $expiresAt = $user->createToken('expiresAt')->expiresAt;
        
        // Devolver la respuesta JSON con el token generado y el estado de éxito
        return response()->json([
            'success' => true,
            'authToken' => $token,
            'expiresAt' => $expiresAt,
            "userName"  => $user->name,
            "userMail"  => $user->email,
            'tokenType' => 'Bearer',
        ]);
    }
    
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email'     => 'required|email',
            'password'  => 'required',
        ]);
    
        if (Auth::attempt($credentials)) {
            // Get user
            $user = User::where('email', $credentials['email'])->firstOrFail();
    
            // Revoke all old tokens
            $user->tokens()->delete();
    
            // Generate new token
            $token = $user->createToken('authToken', ['api'])->plainTextToken;
           
            // Expiration logic
            $expiresAt = Carbon::now()->addMinutes(5); // Default expiration time
            if ($request->rememberMe === 'Y') {
                $expiresAt = Carbon::now()->addDays(30); // Extend expiration time if rememberMe is true
            }

             // Establecer la fecha de vencimiento del token
             $user->tokens()->where('name', 'authToken')->update(['expires_at' => $expiresAt]);
    
            // Token response
            return response()->json([
                'success'   => true,
                'authToken' => $token,
                'userName'  => $user->name,
                'userMail'  => $user->email,
                'expiresAt'   => $expiresAt, // Include expiration in the response
                'tokenType' => 'Bearer'
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Invalid login credentials'
            ], 401);
        }
    }

   public function logout(Request $request)
   {
       $request->user()->currentAccessToken()->delete();

       return response()->json([
           'success' => true,
           'message' => 'Logged out successfully',
       ]);
   }
}