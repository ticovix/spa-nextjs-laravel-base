<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ServiceClient extends Model
{
    public function company()
    {
        return $this->belongsTo('App\Company');
    }

    public function service()
    {
        return $this->belongsTo('App\Service');
    }
}
