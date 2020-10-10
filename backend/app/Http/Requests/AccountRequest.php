<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AccountRequest extends FormRequest
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
        $companyUser = auth()->user();

        return [
            'name' => 'required',
            'phone' => 'present',
            'email' => [
                'required',
                Rule::unique('company_users')
                    ->ignore($companyUser->id)
                    ->whereNull('deleted_at')
            ],
        ];
    }
}
