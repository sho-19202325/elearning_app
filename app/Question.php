<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $guarded = ['id'];

    public function questionList() {
        return $this->belongsTo('App\Question');
    }

    public function options() {
        return $this->hasMany('App\Option');
    }
}
