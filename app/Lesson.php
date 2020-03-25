<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    protected $guarded = ['id'];

    public function user() {
        return $this->belongsTo('App\User');
    }

    public function questionList() {
        return $this->belongsTo('App\QuestionList');
    }

    public function answers() {
        return $this->hasMany('App\Answer');
    }
}
