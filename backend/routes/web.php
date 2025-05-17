<?php

use App\Http\Controllers\ScoreController;
use Illuminate\Support\Facades\Route;

Route::prefix('api')->group(function () {
    Route::get('/search', [ScoreController::class, 'search']);
    Route::get("/dashboard", [ScoreController::class, 'dashboard']);
    Route::get('/topstudent', [ScoreController::class, 'topStudents']);
});
