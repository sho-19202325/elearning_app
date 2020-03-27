<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Answer;

class AnswerController extends Controller
{
    public function index(Request $request) 
    {
        $answers = Answer::all();

        return ['answers' => $answers];
    }

    public function store(Request $request, $lesson_id) {
        $lesson = $request->user()->lessons()->find($lesson_id);
        $answer = $lesson->answers()->create([
            'question_id' => $request->question_id,
            'choice' => $request->choice,
        ]);

        return ['answer' => $answer];
    }

}
