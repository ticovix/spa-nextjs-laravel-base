<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ServiceType extends Model
{
    public function company()
    {
        return $this->belongsTo('App\Company');
    }

    public function services()
    {
        return $this->hasMany('App\Service');
    }
}
