<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Lesson;

class LessonController extends Controller
{
    public function index(Request $request) {
        $lessons = Lesson::all();

        return ['lessons' => $lessons];
    }

    public function store(Request $request) {
        $user = $request->user();

        $lesson = $user->lessons()->create([
            'question_list_id' => $request->questionList_id,
        ]);

        $activity = $lesson->activities()->create([
            'user_id' => $lesson->user_id
        ]);

        return ['lesson' => $lesson, 'activity' => $activity];
    }
}
