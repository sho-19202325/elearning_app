<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\QuestionList;

class QuestionController extends Controller
{
    public function store(Request $request, $id) {
        $questionList = QuestionList::find($id);

        $question = $questionList->questions()->create([
            "statement" => $request->statement,
            "answer" => $request->answer
        ]);

        return ['question' => $question];
    }
}
