<?php

namespace Database\Factories;

use App\Models\CompanyUser;
use Illuminate\Database\Eloquent\Factories\Factory;

class CompanyUserFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = CompanyUser::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'company_id' => request('company_id'),
            'name' => $this->faker->name,
            'email' => $this->faker->freeEmail,
            'password' => bcrypt('123456')
        ];
    }
}
