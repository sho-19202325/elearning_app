<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\User;

class AuthController extends Controller
{
    public function login (Request $request) {
        $credentials = $request->only('email', 'password');
        if(Auth::attempt($credentials)) { 
            $user = auth()->user();
            $token = $user->createToken('Laravel Password Grant Client')->accessToken;
            return ['token' => $token];
        } 
        else {
            return response([
            'message' => 'Unauthenticated.'
            ], 401);
        }
    }
}
