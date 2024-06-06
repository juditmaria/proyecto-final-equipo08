<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\TokenController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\MovieController;
use App\Http\Controllers\Api\RoomController;
use App\Http\Controllers\Api\LocationController;
use App\Http\Controllers\Api\PassController;
use App\Http\Controllers\Api\PromoterController;
use App\Http\Controllers\Api\TicketController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\ProfileController; // Agregado el controlador de perfil

 /*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
//  });

Route::apiResource('token', TokenController::class);
Route::middleware('auth:sanctum')->get('/user', [TokenController::class, 'user']);
Route::post('/register', [TokenController::class, 'register'])->middleware('guest');
Route::post('/login', [TokenController::class, 'login'])->middleware('guest');
Route::post('/logout', [TokenController::class, 'logout'])->middleware('auth:sanctum');

// USERS ///////////////////////////////////////////////////////////////////////
Route::apiResource('users', UserController::class);

Route::get('/users', [UserController::class, 'index']);
Route::post('/users', [UserController::class, 'store']);
Route::get('/users/{user}', [UserController::class, 'show']);
Route::put('/users/{user}', [UserController::class, 'update']);
Route::delete('/users/{user}', [UserController::class, 'destroy']);
Route::post('/users/{user}', [UserController::class, 'update_workaround']);


// MOVIES ////////////////////////////////////////////////////////////////////
Route::apiResource('movies', MovieController::class);

Route::get('/movies', [MovieController::class, 'index']);
Route::post('/movies', [MovieController::class, 'store']);
Route::get('/movies/{movie}', [MovieController::class, 'show']);
Route::put('/movies/{movie}', [MovieController::class, 'update']);
Route::delete('/movies/{movie}', [MovieController::class, 'destroy']);
Route::post('/movies/{movie}', [MovieController::class, 'update_workaround']);


// ROOMS /////////////////////////////////////////////////////////////////////
Route::apiResource('rooms', RoomController::class);

Route::get('/rooms', [RoomController::class, 'index']);
Route::post('/rooms', [RoomController::class, 'store']);
Route::get('/rooms/{room}', [RoomController::class, 'show']);
Route::put('/rooms/{room}', [RoomController::class, 'update']);
Route::delete('/rooms/{room}', [RoomController::class, 'destroy']);
Route::post('/rooms/{room}', [RoomController::class, 'update_workaround']);


// LOCATIONS //////////////////////////////////////////////////////////////
Route::apiResource('locations', LocationController::class);

Route::get('/locations', [LocationController::class, 'index']);
Route::post('/locations', [LocationController::class, 'store']);
Route::get('/locations/{location}', [LocationController::class, 'show']);
Route::post('/locations/{location}', [LocationController::class, 'update']);
Route::delete('/locations/{location}', [LocationController::class, 'destroy']);


// PASSES ///////////////////////////////////////////////////////////////////
Route::apiResource('passes', PassController::class);

Route::get('/passes', [PassController::class, 'index']);
Route::post('/passes', [PassController::class, 'store']);
Route::get('/passes/{pass}', [PassController::class, 'show']);
Route::put('/passes/{pass}', [PassController::class, 'update']);
Route::delete('/passes/{pass}', [PassController::class, 'destroy']);
Route::post('/passes/{pass}', [PassController::class, 'update_workaround']);


// PROMOTERS /////////////////////////////////////////////////////////////////
Route::apiResource('promoters', PromoterController::class);

Route::get('/promoters', [PromoterController::class, 'index']);
Route::post('/promoters', [PromoterController::class, 'store']);
Route::get('/promoters/{promoter}', [PromoterController::class, 'show']);
Route::put('/promoters/{promoter}', [PromoterController::class, 'update']);
Route::delete('/promoters/{promoter}', [PromoterController::class, 'destroy']);
Route::post('/promoters/{promoter}', [PromoterController::class, 'update_workaround']);


// TICKETS ///////////////////////////////////////////////////////////
Route::apiResource('tickets', TicketController::class);

Route::get('/tickets', [TicketController::class, 'index']);
Route::post('/tickets', [TicketController::class, 'store']);
Route::get('/tickets/{ticket}', [TicketController::class, 'show']);
Route::put('/tickets/{ticket}', [TicketController::class, 'update']);
Route::delete('/tickets/{ticket}', [TicketController::class, 'destroy']);
Route::post('/tickets/{ticket}', [TicketController::class, 'update_workaround']);


// Reviews /////////////////////////////////////////////////////////////////
Route::apiResource('reviews', ReviewController::class);

Route::get('/reviews', [ReviewController::class, 'index']);
Route::post('/reviews', [ReviewController::class, 'store']);
Route::get('/reviews/{review}', [ReviewController::class, 'show']);
Route::put('/reviews/{review}', [ReviewController::class, 'update']);
Route::delete('/reviews/{review}', [ReviewController::class, 'destroy']);
Route::post('/reviews/{review}', [ReviewController::class, 'update_workaround']);


// Profiles /////////////////////////////////////////////////////////////////
Route::apiResource('profiles', ProfileController::class);

Route::get('/profiles', [ProfileController::class, 'index']);
Route::post('/profiles', [ProfileController::class, 'store']);
Route::get('/profiles/{profile}', [ProfileController::class, 'show']);
Route::put('/profiles/{profile}', [ProfileController::class, 'update']);
Route::delete('/profiles/{profile}', [ProfileController::class, 'destroy']);
Route::post('/profiles/{profile}', [ProfileController::class, 'update_workaround']);
