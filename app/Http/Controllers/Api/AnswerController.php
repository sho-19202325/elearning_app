<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Answer;

class AnswerController extends Controller
{
    public function index(Request $request) 
    {
        $lessons = $request->user()->lessons;
        $answer = [];
        foreach($lessons as $lesson) {
            array_push($answer, [$lesson->answers]);
        }

        return ['answer' => $answer];
    }

    public function store(Request $request) {
        return $request;
        $lesson = $request->user()->lessons()->find($request->lesson_id);
        $answer = $lesson->answer()->create([
            'question_id' => $request->question_id,
            'choice' => $request->choice,
        ]);

        return ['answer' => $answer];
    }

}
