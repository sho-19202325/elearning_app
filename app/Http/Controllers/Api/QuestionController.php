<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\QuestionList;
use App\Question;

class QuestionController extends Controller
{
    public function index() {
        $questions = Question::orderBy('created_at', 'DESC')->get();

        return ['questions' => $questions];
    }

    public function store(Request $request, $id) {
        $questionList = QuestionList::find($id);

        $question = $questionList->questions()->create([
            "statement" => $request->statement,
            "answer" => $request->answer
        ]);

        return ['question' => $question];
    }

    public function update(Request $request, $questionList_id, $id) {
        $questionList = QuestionList::find($questionList_id);
        $question = $questionList->questions()->find($id);

        $question->update([
            "statement" => $request->statement,
            "answer" => $request->answer,
        ]);

        return ['question' => $question];
    }

    public function delete($questionList_id, $id) {
        $questionList = QuestionList::find($questionList_id);
        $questionList->questions()->find($id)->delete();
        $questions = Question::all();

        return ['questions' => $questions];
    }
}
