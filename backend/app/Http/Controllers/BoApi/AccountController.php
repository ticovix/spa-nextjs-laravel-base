<?php

namespace App\Http\Controllers\BoApi;

use App\Http\Controllers\Controller;
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
        $companyUser = auth()->user();
        $companyUser->updateUser($request->validated());

        return response()->json($companyUser);
    }

    public function changePassword(ChangePasswordRequest $request)
    {
        try {
            $companyUser = auth()->user();
            $companyUser->updatePassword($request->old_password, $request->password);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }
    }

    public function uploadAvatar(Request $request)
    {
        $request->validate([
            'photo' => 'required'
        ]);

        $companyUser = auth()->user();
        $companyUser->handleUpload($request->file('photo'));

        return response()->json([
            'photo' => $companyUser->photo
        ]);
    }

    public function deleteAvatar()
    {
        $companyUser = auth()->user();
        $companyUser->deleteAvatar();
    }
}
