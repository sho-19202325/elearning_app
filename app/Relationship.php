<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Relationship extends Model
{
    public function activities()
    {
        return $this->morphMany('App\Activity', 'activitable');
    }

    protected $guarded = ['id'];
}
