<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\PromoterController;
use App\Http\Controllers\Api\TicketController;
use App\Http\Controllers\Api\ReviewController;




/* Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum'); */

Route::apiResource('users', UserController::class);
Route::apiResource('promoters', PromoterController::class);
Route::apiResource('tickets', TicketController::class);
Route::apiResource('reviews', ReviewController::class);