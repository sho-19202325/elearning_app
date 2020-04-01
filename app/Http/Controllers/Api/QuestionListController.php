<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\QuestionList;

class QuestionListController extends Controller
{
    public function index() 
    {
        $questionLists = QuestionList::orderBy('created_at', 'DESC')->get();

        return ['questionLists' => $questionLists];
    }

    public function store(Request $request) {
        $questionList = $request->user()->questionLists()->create([
            'title' => $request->title,
            'description' => $request->description
        ]);

        $questionLists = QuestionList::all();

        return $questionLists;
    }

    public function update(Request $request, $id) {
        $questionList = $request->user()->questionLists()->find($id)->update([
            'title' => $request->title,
            'description' => $request->description
        ]);

        return ['questionList' => $questionList];
    }

    public function delete(Request $request, $id) {
        $request->user()->questionLists()->find($id)->delete();
        $questionLists = QuestionList::all();

        return ['questionLists' => $questionLists];
    }
}
