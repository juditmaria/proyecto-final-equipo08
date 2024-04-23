<?php
use App\Http\Controllers\UsuarioController;

Route::get('/usuarios', [UsuarioController::class, 'index']);