<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $guarded = ['id'];

    public function questionLists() {
        return $this->belongsTo('App\Question');
    }
}
