<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserRequest extends FormRequest
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
        $user = request()->route()->parameter('user');
        $rules = [
            'name' => 'required',
            'phone' => 'present',
            'email' => [
                'required',
                Rule::unique('users')
                    ->ignore($user)
                    ->where('deleted_at', NULL)
            ],
            'password' => 'nullable|required_with:password_confirmation'
        ];

        if (empty($user) || ! empty($user) && ! empty($this->password)) {
            $rules['password'] = 'required|confirmed|min:6';
        }

        return $rules;
    }
}
