<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InsuranceCompanyProduct extends Model
{
    public function company()
    {
        return $this->belongsTo('App\Company');
    }

    public function insurance()
    {
        return $this->belongsTo('App\InsuranceCompany');
    }
}
