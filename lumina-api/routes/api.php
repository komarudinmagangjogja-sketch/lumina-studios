<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\PortfolioController;
use App\Http\Controllers\Api\PricingController;
use App\Http\Controllers\Api\TestimonialController;
use App\Http\Controllers\Api\FaqController;
use App\Http\Controllers\Api\Admin\AuthController;
use App\Http\Controllers\Api\Admin\DashboardController;

/*
|--------------------------------------------------------------------------
| PUBLIC ROUTES
|--------------------------------------------------------------------------
*/

Route::apiResource('services', ServiceController::class)->only(['index', 'show']);
Route::apiResource('portfolios', PortfolioController::class)->only(['index', 'show']);
Route::apiResource('pricings', PricingController::class)->only(['index', 'show']);
Route::apiResource('testimonials', TestimonialController::class)->only(['index', 'show']);
Route::apiResource('faqs', FaqController::class)->only(['index', 'show']);


/*
|--------------------------------------------------------------------------
| AUTH
|--------------------------------------------------------------------------
*/

Route::post('/admin/login', [AuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| ADMIN ROUTES
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->prefix('admin')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);

    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index']);

    // CRUD
    Route::apiResource('services', ServiceController::class)->except(['index','show']);
    Route::apiResource('portfolios', PortfolioController::class)->except(['index','show']);
    Route::apiResource('pricings', PricingController::class)->except(['index','show']);
    Route::apiResource('testimonials', TestimonialController::class);
    Route::apiResource('faqs', FaqController::class)->except(['index','show']);
});