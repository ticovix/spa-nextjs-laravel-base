<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CompanyUserRequest extends FormRequest
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
        $companyUser = request()->route()->parameter('companyUser');
        $rules = [
            'name' => 'required',
            'phone' => 'present',
            'email' => [
                'required',
                Rule::unique('company_users')
                    ->ignore($companyUser)
                    ->where('deleted_at', NULL)
            ],
            'password' => 'nullable|required_with:password_confirmation'
        ];

        if (empty($companyUser) || ! empty($companyUser) && ! empty($this->password)) {
            $rules['password'] = 'required|confirmed|min:6';
        }

        return $rules;
    }
}
