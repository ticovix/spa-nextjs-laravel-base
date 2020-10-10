<?php

namespace App\Traits;

use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RecoveryPasswordRequest;
use App\Http\Requests\ResetPasswordRequest;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

trait AuthTrait
{
    public function login(LoginRequest $request) {
        $credentials = request(['email', 'password']);
        $auth = auth($this->guard);
        if ($request->remember) {
            $auth = $auth->setTTL(config('jwt.extended_ttl'));
        }

        $token = $auth->attempt($credentials);
        if (! $token) {
            return basicResponse('E-mail ou senha inválidos.', 400);
        }

        return response()->json([
            'token' => $token,
            'user' => $auth->user(),
        ])->header('Authorization', 'Bearer ' . $token);
    }

    public function logout()
    {
        $auth = auth($this->guard);
        if ($auth->check()) {
            $auth->logout();
        }

        return [];
    }

    public function refreshToken(Request $request)
    {
        $auth = auth($this->guard);
        if ($request->remember) {
            $auth = $auth->setTTL(config('jwt.extended_ttl'));
        }

        $newToken = $auth->refresh(true);

        return response()->json([
            'token' => $newToken
        ])->header('Authorization', 'Bearer ' . $newToken);
    }

    public function recoveryPassword(RecoveryPasswordRequest $request)
    {
        $status = Password::broker($this->broker)->sendResetLink(
            $request->only('email')
        );

        if ($status === Password::RESET_LINK_SENT) {
            return basicResponse(__($status));
        }

        return basicResponse(__($status), 400);
    }

    public function resetPassword(ResetPasswordRequest $request)
    {
        $status = Password::broker($this->broker)->reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) use ($request) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->save();

                $user->setRememberToken(Str::random(60));

                event(new PasswordReset($user));
            }
        );

        if ($status == Password::PASSWORD_RESET) {
            return basicResponse(__($status));
        }

        return basicResponse(__($status), 400);
    }
}
