<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VehicleType extends Model
{
    public function companyVehicles()
    {
        return $this->hasMany('App\CompanyVehicle');
    }

    public function serviceVehicles()
    {
        return $this->hasMany('App\ServiceVehicle');
    }

    public static function getAll($companyId)
    {
        return self::query()->where('company_id', $companyId)->get();
    }

    public function createVehicleType($companyId, $data)
    {
        $this->company_id = $companyId;
        $this->description = ucfirst($data['description']);
        $this->save();
    }

    public function updateVehicleType($data)
    {
        $this->description = ucfirst($data['description']);
        $this->save();
    }
}
