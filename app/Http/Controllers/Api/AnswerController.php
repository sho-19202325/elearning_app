<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AnswerController extends Controller
{
    public function index(Request $request) 
    {
        $lesson = $request->user()->lessons;
        if(count($lesson) < 1 || count($lesson->answers) < 1) {
            return ['answers' => []];
        } else {
            $answers = $lesson->answers;
            return ['answers' => $answers];            
        }
    }

    public function store(Request $request) {
        $lesson = Lesson::find($request->lesson_id);
        $answer = $lesson->answer()->create([
            'question_id' => $request->question_id,
            'choice' => $request->choice,
        ]);

        return ['answer' => $answer];
    }

}
