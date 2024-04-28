<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\MovieController;
use App\Http\Controllers\Api\RoomController;
use App\Http\Controllers\Api\LocationController;
use App\Http\Controllers\Api\PassController;
use App\Http\Controllers\Api\PromoterController;
use App\Http\Controllers\Api\TicketController;
use App\Http\Controllers\Api\ReviewController;

Route::apiResource('users', UserController::class);
Route::apiResource('movies', MovieController::class);
Route::apiResource('rooms', RoomController::class);
Route::apiResource('locations', LocationController::class);
Route::apiResource('passes', PassController::class);
Route::apiResource('promoters', PromoterController::class);
Route::apiResource('tickets', TicketController::class);
Route::apiResource('reviews', ReviewController::class);