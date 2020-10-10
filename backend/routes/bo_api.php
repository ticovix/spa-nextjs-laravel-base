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

Route::get('/', 'IndexController@index');
Route::prefix('v1')->group(function () {
    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('reset-password', 'AuthController@recoveryPassword');
    Route::put('reset-password', 'AuthController@resetPassword');

    Route::middleware('auth:company_user')->group(function () {
        Route::post('refresh-token', 'AuthController@refreshToken');

        Route::prefix('account')->group(function () {
            Route::get('', 'CompanyUserController@show');
            Route::put('', 'AccountController@update');
            Route::patch('password', 'AccountController@changePassword');
            Route::post('avatar', 'AccountController@uploadAvatar');
            Route::delete('avatar', 'AccountController@deleteAvatar');
        });

        Route::prefix('users')->group(function () {
            Route::get('', 'CompanyUserController@index');
            Route::post('', 'CompanyUserController@store');
            Route::post('{companyUser}/avatar', 'CompanyUserController@uploadAvatar');
            Route::delete('{companyUser}/avatar', 'CompanyUserController@deleteAvatar');
            Route::get('{companyUser}', 'CompanyUserController@show');
            Route::put('{companyUser}', 'CompanyUserController@update');
            Route::delete('{companyUser}', 'CompanyUserController@destroy');
        });

        Route::prefix('drivers')->group(function () {
            Route::get('', 'DriverController@index');
            Route::post('', 'DriverController@store');
            Route::put('{driver}', 'DriverController@update');
            Route::delete('{driver}', 'DriverController@destroy');
        });

        Route::prefix('insurance-companies')->group(function () {
            Route::get('', 'InsuranceCompanyController@index');
            Route::post('', 'InsuranceCompanyController@store');
            Route::put('{insuranceCompany}', 'InsuranceCompanyController@update');
            Route::delete('{insuranceCompany}', 'InsuranceCompanyController@destroy');
        });

        Route::prefix('company-vehicles')->group(function () {
            Route::get('', 'CompanyVehicleController@index');
            Route::post('', 'CompanyVehicleController@store');
            Route::put('{companyVehicle}', 'CompanyVehicleController@update');
            Route::delete('{companyVehicle}', 'CompanyVehicleController@destroy');
        });

        Route::prefix('vehicle-types')->group(function () {
            Route::get('', 'VehicleTypeController@index');
            Route::post('', 'VehicleTypeController@store');
            Route::put('{driver}', 'VehicleTypeController@update');
            Route::delete('{driver}', 'VehicleTypeController@destroy');
        });
    });
});
