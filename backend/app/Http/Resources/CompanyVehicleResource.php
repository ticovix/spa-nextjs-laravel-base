<?php

namespace App\Http\Resources;

use App\Models\VehicleType;
use Illuminate\Http\Resources\Json\JsonResource;

class CompanyVehicleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'vehicle_type_id' => $this->vehicle_type_id,
            'year' => $this->year,
            'color' => $this->color,
            'license_plate' => $this->license_plate,
            'liters_per_mileage' => $this->liters_per_mileage,
            'type_description' => $this->type_description
        ];
    }
}
