<?php

namespace App\Http\Controllers\BoApi;

use App\Models\Driver;
use App\Http\Controllers\Controller;
use App\Http\Requests\DriverRequest;

class DriverController extends Controller
{
    public function index()
    {
        return Driver::getAllByCompany(auth()->user()->company_id);
    }

    public function store(DriverRequest $request)
    {
        $driver = new Driver();
        $driver->createDriver(auth()->user()->company_id, $request->validated());

        return $driver->getAttributes();
    }

    public function update(Driver $driver, DriverRequest $request)
    {
        $driver->updateDriver($request->validated());

        return $driver->getAttributes();
    }

    public function destroy(Driver $driver)
    {
        $driver->delete();
    }
}
