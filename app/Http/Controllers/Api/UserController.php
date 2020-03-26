<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Relationship;

class UserController extends Controller
{
    public function index(Request $request) {
        $authUser = $request->user();
        $users = User::where('id', '!=', $authUser->id)->get();

        return ['users' => $users];
    }

    public function store(Request $request) {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        $credentials = $request->only('email', 'password');
        Auth::attempt($credentials);
        $token = $user->createToken('Laravel Password Grant Client')->accessToken;

        return ['token' => $token];
    }

    public function show($id) {
        $user = User::find($id);

        return ['user' => $user];
    }

    public function relationships() {
        $relationships = Relationship::all();

        return ['relationships' => $relationships];
    }

    public function follow(Request $request, $followed_id) {
        $follower = $request->user();

        if (!$follower->isFollowing($followed_id)){
            $follower->followedUsers()->attach($followed_id);
        }

        $relationship = Relationship::where('follower_id', $follower->id)->where('followed_id', $followed_id)->get()[0];

        return ['relationship' => $relationship];
    }

    public function unfollow(Request $request, $followed_id) {
        $follower = $request->user();

        $follower->followedUsers()->detach($followed_id);

        $relationships = Relationship::all();

        return ['relationships' => $relationships];
    }
}
