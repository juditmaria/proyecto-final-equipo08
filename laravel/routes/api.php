<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\MovieController;
use App\Http\Controllers\Api\RoomController;
use App\Http\Controllers\Api\LocationController;
use App\Http\Controllers\Api\PassController;

Route::apiResource('users', UserController::class);
Route::apiResource('movies', MovieController::class);
Route::apiResource('rooms', RoomController::class);
Route::apiResource('locations', LocationController::class);
Route::apiResource('passes', PassController::class);