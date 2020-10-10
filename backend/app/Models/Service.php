<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    public function company()
    {
        return $this->belongsTo('App\Company');
    }

    public function companyUser()
    {
        return $this->belongsTo('App\CompanyUser');
    }

    public function serviceType()
    {
        return $this->belongsTo('App\ServiceType');
    }

    public function contractors()
    {
        return $this->hasMany('App\ServiceContractor');
    }

    public function clients()
    {
        return $this->hasMany('App\ServiceClient');
    }

    public function addresses()
    {
        return $this->hasMany('App\Address');
    }
}
