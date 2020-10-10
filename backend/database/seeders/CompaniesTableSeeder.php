<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\CompanyUser;
use Illuminate\Database\Seeder;

class CompaniesTableSeeder extends Seeder
{
    public function run()
    {
        Company::factory()->times(3)->create()->each(function ($company) {
            $companyUser = CompanyUser::factory()->times(2)->create(['company_id' => $company->id]);
        });
    }
}
