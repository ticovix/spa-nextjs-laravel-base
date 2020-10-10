<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class History extends Model
{
    public function company()
    {
        return $this->belongsTo('App\Company');
    }

    public function customer()
    {
        return $this->belongsTo('App\Customer');
    }

    public function driver()
    {
        return $this->belongsTo('App\Driver');
    }

    public function service()
    {
        return $this->belongsTo('App\Service');
    }

    public function companyUser()
    {
        return $this->belongsTo('App\CompanyUser');
    }
}
