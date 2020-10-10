<?php

namespace App\Http\Controllers\BoApi;

use App\Http\Controllers\Controller;
use App\Http\Requests\VehicleTypeRequest;
use App\Http\Resources\VehicleTypeResource;
use App\Models\VehicleType;

class VehicleTypeController extends Controller
{
    public function index()
    {
        $companyId = auth()->user()->company_id;

        return VehicleTypeResource::collection(VehicleType::getAll($companyId));
    }

    public function store(VehicleTypeRequest $request)
    {
        $vehicleType = new VehicleType();
        $vehicleType->createVehicleType(auth()->user()->company_id, $request->validated());

        return new VehicleTypeResource($vehicleType);
    }

    public function update(VehicleType $vehicleType, VehicleTypeRequest $request)
    {
        $vehicleType->updateVehicleType($request->validated());

        return new VehicleTypeResource($vehicleType);
    }

    public function destroy(VehicleType $vehicleType)
    {
        $vehicleType->delete();
    }
}
