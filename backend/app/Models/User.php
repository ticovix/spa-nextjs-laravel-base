<?php

namespace App\Models;

use App\Enums\UploadPath;
use App\General\Upload;
use App\Notifications\ResetPassword as ResetPasswordNotification;
use Illuminate\Contracts\Auth\CanResetPassword;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject, CanResetPassword
{
    use Notifiable, SoftDeletes, HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'photo'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'status'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
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

    public function setNameAttribute($name)
    {
        $this->attributes['name'] = ucfirst($name);
    }

    public function createUser($data)
    {
        $this->fill($data);
        $this->save();
    }

    public function updateUser($data)
    {
        $this->fill($data);
        $this->update();
    }

    public function updatePassword($oldPassword, $newPassword)
    {
        if (! Hash::check($oldPassword, $this->password)) {
            throw new \Exception('Senha antiga incorreta.');
        }

        $this->password = $newPassword;
        $this->save();
    }

    public function handleUpload($photo)
    {
        $upload = new Upload($photo);
        $upload->image_resize = true;
        $upload->image_x = 400;
        $upload->image_y = 400;
        $upload->image_ratio_crop = true;
        $this->photo = $upload->save(UploadPath::USER_IMAGES);
        $this->update();
    }

    public function deleteAvatar()
    {
        Storage::delete(realStoragePath($this->photo));

        $this->photo = null;
        $this->update();
    }
}
