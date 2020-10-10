<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class InsuranceCompany extends Model
{
    use SoftDeletes;

    protected $visible = ['id', 'name', 'cnpj'];

    public function company()
    {
        return $this->belongsTo('App\Company');
    }

    public function products()
    {
        return $this->hasMany('App\InsuranceCompanyProduct');
    }

    public static function getAllByCompany($companyId)
    {
        return self::query()->where('company_id', $companyId)->get();
    }

    public function createInsuranceCompany($companyId, $data)
    {
        $this->company_id = $companyId;
        $this->name = ucfirst($data['name']);
        $this->cnpj = $data['cnpj'];
        $this->save();
    }

    public function updateInsuranceCompany($data)
    {
        $this->name = $data['name'];
        $this->cnpj = $data['cnpj'];
        $this->save();
    }
}
