<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CompanyVehicleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required',
            'vehicle_type_id' => 'required|integer',
            'year' => 'nullable|integer',
            'color' => 'nullable',
            'license_plate' => 'required',
            'liters_per_mileage' => 'nullable|integer',
        ];
    }
}
