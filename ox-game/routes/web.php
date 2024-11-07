<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('title');
});

Route::get('/game/play', function () {
    return view('game');
});

Route::post('/game/move', [
    App\Http\Controllers\GameController::class,
    'updateGame'
]);

Route::get('/game/reset', [
    App\Http\Controllers\GameController::class,
    'resetGame'
]);

Route::get('/game/end', [
    App\Http\Controllers\GameController::class,
    'endGame'
]);