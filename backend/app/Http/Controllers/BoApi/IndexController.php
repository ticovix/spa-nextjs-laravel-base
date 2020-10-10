<?php

namespace App\Http\Controllers\BoApi;

use App\Http\Controllers\Controller;

class IndexController extends Controller
{
    public function index()
    {
        return ['message' => 'Seja bem vindo'];
    }
}
