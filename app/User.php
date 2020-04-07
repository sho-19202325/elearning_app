<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use Notifiable;
    use HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function questionLists() {
        return $this->hasMany('App\QuestionList');
    }

    public function lessons() {
        return $this->hasMany('App\Lesson');
    }

    public function followers() {
        return $this->belongsToMany('App\User', 'relationships', 'followed_id', 'follower_id')->withTimeStamps();
    }

    public function followedUsers() {
        return $this->belongsToMany('App\User', 'relationships', 'follower_id', 'followed_id')->withTimeStamps();
    }

    public function isFollowing($followed_id) {
        return $this->followedUsers()->where('followed_id', $followed_id)->exists();
    }

    public function activities() {
        return $this->hasMany('App\Activiy');
    }
}
