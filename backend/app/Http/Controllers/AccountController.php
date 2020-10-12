<?php

namespace App\Http\Controllers;

use App\Http\Requests\AccountRequest;
use App\Http\Requests\ChangePasswordRequest;
use Illuminate\Http\Request;

class AccountController extends Controller
{
    public function show(Request $request)
    {
        return $request->user();
    }

    public function update(AccountRequest $request)
    {
        $user = auth()->user();
        $user->updateUser($request->validated());

        return response()->json($user);
    }

    public function changePassword(ChangePasswordRequest $request)
    {
        try {
            $user = auth()->user();
            $user->updatePassword($request->old_password, $request->password);
        } catch (\Exception $e) {
            return basicResponse($e->getMessage(), 422);
        }
    }

    public function uploadAvatar(Request $request)
    {
        $request->validate([
            'photo' => 'required'
        ]);

        $user = auth()->user();
        $user->handleUpload($request->file('photo'));

        return response()->json([
            'photo' => $user->photo
        ]);
    }

    public function deleteAvatar()
    {
        $user = auth()->user();
        $user->deleteAvatar();
    }
}
