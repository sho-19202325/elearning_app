<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Question;
use App\Option;

class OptionController extends Controller
{
    public function index() {
        $options = Option::all();

        return ['options' => $options];
    }

    public function update(Request $request, $question_id) {
        $question = Question::find($question_id);
        $options = $question->options;
        for ($i = 0;$i < count($options); $i++) {
            $options[$i]->update([
                'content' => $request->options[$i]
            ]);
        }

        return ['options' => $options];
    }
}
