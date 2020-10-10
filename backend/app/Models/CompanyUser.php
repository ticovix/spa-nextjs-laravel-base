<?php

namespace App\Models;

use App\Enums\UploadPath;
use App\General\Upload;
use App\Notifications\ResetPassword as ResetPasswordNotification;
use Illuminate\Contracts\Auth\CanResetPassword;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CompanyUser extends Authenticatable implements JWTSubject, CanResetPassword
{
    use Notifiable, SoftDeletes, HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'phone', 'password', 'photo'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $visible = [
        'id', 'name', 'email', 'phone', 'photo', 'company_id', 'created_at', 'updated_at'
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    public function sendPasswordResetNotification($token)
    {
        $this->notify(new ResetPasswordNotification($token, $this));
    }

    public function setPasswordAttribute($password)
    {
        $this->attributes['password'] = Hash::make($password);
    }

    public function company()
    {
        return $this->belongsTo('App\Company');
    }

    public function addresses()
    {
        return $this->hasMany('App\Address');
    }

    public function services()
    {
        return $this->hasMany('App\Service');
    }

    public static function getAllByCompany($companyId)
    {
        return self::query()->where('company_id', $companyId)->get();
    }

    public function createUser($companyId, $data)
    {
        $this->fill($data);
        $this->company_id = $companyId;
        $this->name = ucfirst($this->name);
        $this->save();
    }

    public function updateUser($data)
    {
        $this->fill($data);
        $this->name = ucfirst($this->name);
        $this->update();
    }

    /**
     * @param $oldPassword
     * @param $newPassword
     * @throws \Exception
     */
    public function updatePassword($oldPassword, $newPassword)
    {
        if (!Hash::check($oldPassword, $this->password)) {
            throw new \Exception('Senha antiga incorreta.');
        }

        $this->password = $newPassword;
        $this->save();
    }

    public function handleUpload($photo)
    {
        $upload = new Upload($photo);
        $this->photo = $upload->save(UploadPath::COMPANY_USERS_IMAGES);
        $this->update();
    }

    public function deleteAvatar()
    {
        Storage::delete(realStoragePath($this->photo));

        $this->photo = null;
        $this->update();
    }
}
