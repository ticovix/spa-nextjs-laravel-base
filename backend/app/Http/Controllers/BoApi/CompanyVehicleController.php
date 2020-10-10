<?php

namespace App\Http\Controllers\BoApi;

use App\Http\Resources\CompanyVehicleResource;
use App\Models\CompanyVehicle;
use App\Http\Controllers\Controller;
use App\Http\Requests\CompanyVehicleRequest;
use App\Http\Resources\VehicleTypeResource;
use App\Models\VehicleType;

class CompanyVehicleController extends Controller
{
    public function index()
    {
        $companyId = auth()->user()->company_id;

        return CompanyVehicleResource::collection(CompanyVehicle::getAll($companyId))->additional([
                'meta' => [
                    'types' => VehicleTypeResource::collection(VehicleType::getAll($companyId))
                ]
            ]);
    }

    public function store(CompanyVehicleRequest $request)
    {
        $companyVehicle = new CompanyVehicle();
        $companyVehicle->createCompanyVehicle(auth()->user()->company_id, $request->validated());

        return new CompanyVehicleResource($companyVehicle);
    }

    public function update(CompanyVehicle $companyVehicle, CompanyVehicleRequest $request)
    {
        $companyVehicle->updateCompanyVehicle($request->validated());

        return new CompanyVehicleResource($companyVehicle);
    }

    public function destroy(CompanyVehicle $companyVehicle)
    {
        $companyVehicle->delete();
    }
}
