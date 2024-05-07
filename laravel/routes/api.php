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

Route::apiResource('users', UserController::class);
Route::apiResource('movies', MovieController::class);
Route::apiResource('rooms', RoomController::class);
Route::apiResource('locations', LocationController::class);
Route::apiResource('passes', PassController::class);
Route::apiResource('promoters', PromoterController::class);
Route::apiResource('tickets', TicketController::class);
Route::apiResource('reviews', ReviewController::class);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
 });

Route::apiResource('token', TokenController::class);
Route::middleware('auth:sanctum')->get('/user', [TokenController::class, 'user']);
Route::post('/register', [TokenController::class, 'register'])->middleware('guest');
Route::post('/login', [TokenController::class, 'login'])->middleware('guest');
Route::post('/logout', [TokenController::class, 'logout'])->middleware('auth:sanctum');