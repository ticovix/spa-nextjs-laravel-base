<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    public function company()
    {
        return $this->belongsTo('App\Company');
    }

    public function addresses()
    {
        return $this->hasMany('App\Address');
    }
}
