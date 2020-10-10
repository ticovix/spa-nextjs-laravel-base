<?php

namespace App\Http\Controllers\BoApi;

use App\Models\InsuranceCompany;
use App\Http\Controllers\Controller;
use App\Http\Requests\InsuranceCompanyRequest;

class InsuranceCompanyController extends Controller
{
    public function index()
    {
        return InsuranceCompany::getAllByCompany(auth()->user()->company_id);
    }

    public function store(InsuranceCompanyRequest $request)
    {
        $driver = new InsuranceCompany();
        $driver->createInsuranceCompany(auth()->user()->company_id, $request->validated());

        return $driver->getAttributes();
    }

    public function update(InsuranceCompany $driver, InsuranceCompanyRequest $request)
    {
        $driver->updateInsuranceCompany($request->validated());

        return $driver->getAttributes();
    }

    public function destroy(InsuranceCompany $driver)
    {
        $driver->delete();
    }
}
