<?php

namespace App\Http\Controllers;

use App\Traits\AuthTrait;

class AuthController extends Controller
{
    protected $guard = 'api';
    protected $broker = 'users';

    use AuthTrait;
}
