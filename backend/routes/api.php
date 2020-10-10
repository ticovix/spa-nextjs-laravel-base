<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('v1')->group(function () {
    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('reset-password', 'AuthController@recoveryPassword');
    Route::put('reset-password', 'AuthController@resetPassword');

    Route::middleware('auth:api')->group(function () {
        Route::post('refresh-token', 'AuthController@refreshToken');

        Route::prefix('account')->group(function () {
            Route::get('', 'AccountController@show');
            Route::put('', 'AccountController@update');
            Route::patch('password', 'AccountController@changePassword');
            Route::post('avatar', 'AccountController@uploadAvatar');
            Route::delete('avatar', 'AccountController@deleteAvatar');
        });

        Route::prefix('users')->group(function () {
            Route::get('', 'UserController@index');
            Route::post('', 'UserController@store');
            Route::post('{user}/avatar', 'UserController@uploadAvatar');
            Route::delete('{user}/avatar', 'UserController@deleteAvatar');
            Route::get('{user}', 'UserController@show');
            Route::put('{user}', 'UserController@update');
            Route::delete('{user}', 'UserController@destroy');
        });
    });
});
