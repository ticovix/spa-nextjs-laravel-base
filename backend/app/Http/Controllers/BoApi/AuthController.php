<?php

namespace App\Http\Controllers\BoApi;

use App\Http\Controllers\Controller;
use App\Traits\AuthTrait;

class AuthController extends Controller
{
    protected $guard = 'company_user';
    protected $broker = 'company_users';

    use AuthTrait;
}
