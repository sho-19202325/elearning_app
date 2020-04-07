<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Activity;

class ActivityController extends Controller
{
    public function index() {
        $activities = Activity::orderBy('created_at', 'DESC')->get();

        return ['activities' => $activities];
    }
}
