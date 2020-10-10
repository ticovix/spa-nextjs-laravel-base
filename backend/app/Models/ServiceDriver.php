<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ServiceDriver extends Model
{
    public function company()
    {
        return $this->belongsTo('App\Company');
    }

    public function driver()
    {
        return $this->belongsTo('App\Driver');
    }

    public function service()
    {
        return $this->belongsTo('App\Service');
    }

    public function companyVehicle()
    {
        return $this->belongsTo('App\CompanyVehicle');
    }
}
