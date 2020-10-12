<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        return User::all();
    }

    public function show(User $user)
    {
        return $user;
    }

    public function store(UserRequest $request)
    {
        $user = new User();
        $user->createUser($request->validated());

        return response()->json($user, 201);
    }

    public function uploadAvatar(Request $request, User $user)
    {
        $request->validate([
            'photo' => 'required'
        ]);

        $user->handleUpload($request->file('photo'));

        return response()->json([
            'photo' => $user->photo
        ]);
    }

    public function deleteAvatar(User $user)
    {
        $user->deleteAvatar();
    }

    public function update(UserRequest $request, User $user)
    {
        $user->updateUser($request->validated());

        return response()->json($user);
    }

    public function destroy(User $user)
    {
        $user->delete();
    }
}
