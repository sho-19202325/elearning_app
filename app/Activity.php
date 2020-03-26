<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    protected $guarded = ['id'];

    public function activitable()
    {
        return $this->morphTo();
    }

    public function user() 
    {
        return $this->belongsTo('App\User');
    }
}
