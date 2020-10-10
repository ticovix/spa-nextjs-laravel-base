<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Driver extends Model
{
    use SoftDeletes;

    protected $visible = ['id', 'name', 'cellphone', 'email'];

    public function company()
    {
        return $this->belongsTo('App\Company');
    }

    public function addresses()
    {
        return $this->hasMany('App\Address');
    }

    public static function getAllByCompany($companyId)
    {
        return self::query()->where('company_id', $companyId)->get();
    }

    public function createDriver($companyId, $data)
    {
        $this->company_id = $companyId;
        $this->name = ucfirst($data['name']);
        $this->email = $data['email'];
        $this->cellphone = $data['cellphone'];
        $this->save();
    }

    public function updateDriver($data)
    {
        $this->name = ucfirst($data['name']);
        $this->email = $data['email'];
        $this->cellphone = $data['cellphone'];

        $this->save();
    }
}
