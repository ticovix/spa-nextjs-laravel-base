<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class VehicleTypeRequest extends FormRequest
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
        $companyId = auth()->user()->company_id;
        $vehicleType = request()->route()->parameter('vehicleType');

        return [
            'description' => [
                'required',
                Rule::unique('vehicle_types')
                    ->ignore($vehicleType)
                    ->where('company_id', $companyId)
                    ->where('deleted_at', NULL)
            ]
        ];
    }
}
