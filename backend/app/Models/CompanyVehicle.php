<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CompanyVehicle extends Model
{
    use SoftDeletes;

    public function getTypeDescriptionAttribute()
    {
        $vehicleType = $this->vehicleType();
        if (!empty($vehicleType)) {
            return $vehicleType->description;
        }

        return null;
    }

    public function company()
    {
        return $this->belongsTo('App\Company');
    }

    public function vehicleType()
    {
        return $this->belongsTo('App\VehicleType');
    }

    public static function getAll($companyId)
    {
        return self::query()->where('company_id', $companyId)->get();
    }

    public function createCompanyVehicle($companyId, $data)
    {
        $this->company_id = $companyId;
        $this->vehicle_type_id = $data['vehicle_type_id'];
        $this->name = ucfirst($data['name']);
        $this->year = $data['year'];
        $this->color = ucwords($data['color']);
        $this->license_plate = $data['license_plate'];
        $this->liters_per_mileage = $data['liters_per_mileage'];
        $this->save();
    }

    public function updateCompanyVehicle($data)
    {
        $this->vehicle_type_id = $data['vehicle_type_id'];
        $this->name = ucfirst($data['name']);
        $this->year = $data['year'];
        $this->color = ucwords($data['color']);
        $this->license_plate = $data['license_plate'];
        $this->liters_per_mileage = $data['liters_per_mileage'];
        $this->save();
    }
}
