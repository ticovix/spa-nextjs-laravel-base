<?php

namespace App\Http\Controllers\BoApi;

use App\Models\CompanyUser;
use App\Http\Controllers\Controller;
use App\Http\Requests\CompanyUserRequest;
use Illuminate\Http\Request;
use App\Http\Resources\CompanyUserResource;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;

class CompanyUserController extends Controller
{
    public function index()
    {
        return CompanyUser::getAllByCompany(auth()->user()->company_id);
    }

    public function show(CompanyUser $companyUser)
    {
        Gate::authorize('same-company', $companyUser);

        return $companyUser;
    }

    public function store(CompanyUserRequest $request)
    {
        $companyUser = new CompanyUser();
        $companyUser->createUser(auth()->user()->company_id, $request->validated());

        return response()->json($companyUser, 201);
    }

    public function uploadAvatar(Request $request, CompanyUser $companyUser)
    {
        $request->validate([
            'photo' => 'required'
        ]);

        Gate::authorize('same-company', $companyUser);
        $companyUser->handleUpload($request->file('photo'));

        return response()->json([
            'photo' => $companyUser->photo
        ]);
    }

    public function deleteAvatar(CompanyUser $companyUser)
    {
        Gate::authorize('same-company', $companyUser);

        $companyUser->deleteAvatar();
    }

    public function update(CompanyUserRequest $request, CompanyUser $companyUser)
    {
        Gate::authorize('same-company', $companyUser);

        $companyUser->updateUser($request->validated());

        return response()->json($companyUser);
    }

    public function destroy(CompanyUser $companyUser)
    {
        Gate::authorize('same-company', $companyUser);

        $companyUser->delete();
    }
}
