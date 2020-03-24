<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class LessonController extends Controller
{
    public function index(Request $request) {
        $lessons = $request->user()->lessons;

        return ['lessons' => $lessons];
    }

    public function store(Request $request) {
        $user = $request->user();

        $lesson = $user->lessons()->create([
            'question_list_id' => $request->questionList_id,
        ]);

        return ['lesson' => $lesson];
    }
}
