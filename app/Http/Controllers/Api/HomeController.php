<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class HomeController extends Controller
{
    public function index(Request $request) {
        return $request->user();
    }

    public function update(Request $request) {
        $user = $request->user();

        $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|unique:users|max:255'
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);
    
        return ['user' => $user];
    } 

    public function changeAvatar(Request $request) {
        $request->validate([
            'avatar' => 'required|image|mimes:jpeg,jpg,png,gif|max:1000'
        ]);

        $user = $request->user();
        $fileName = time() . '.' . 
        $request->avatar->getClientOriginalExtension();
        $request->avatar->move(public_path('images') , $fileName);

        $oldFile = $user->avatar;

        $user->update([
            'avatar' => $fileName
        ]);

        if ($oldFile != "default.jpg") {
            unlink(public_path('images') . '/' . $oldFile);
        }

        return ['user' => $user];
    }
}