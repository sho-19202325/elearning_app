<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class QuestionList extends Model
{
    protected $guarded = ['id'];

    public function user() {
        return $this->belongsTo('App\User');
    }

    public function questions() {
        return $this->hasMany('App\Question');
    }

    public function lessons() {
        return $this->hasMany('App\Lesson');
    }
}
