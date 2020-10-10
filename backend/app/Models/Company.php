<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Company extends Model
{
    use HasFactory;

    public function users()
    {
        return $this->hasMany('App\CompanyUser');
    }

    public function addresses()
    {
        return $this->hasMany('App\Address');
    }

    public function services()
    {
        return $this->hasMany('App\Service');
    }

    public function drivers()
    {
        return $this->hasMany('App\Driver');
    }

    public function vehicles()
    {
        return $this->hasMany('App\CompanyVehicle');
    }

    public function customers()
    {
        return $this->hasMany('App\Customer');
    }

    public function insuranceCompanies()
    {
        return $this->hasMany('App\InsuranceCompany');
    }
}
