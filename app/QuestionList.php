<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class QuestionList extends Model
{
    protected $guarded = ['id'];

    public function user() {
        return $this.beloongsTo('App\User');
    }
}
