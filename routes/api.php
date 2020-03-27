<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/user', 'Api\UserController@store');

Route::post('/login', 'Api\AuthController@login');

Route::group(['middleware' => 'auth:api'], function() {

    Route::get('/user', 'Api\HomeController@index');

    Route::patch('/update', 'Api\HomeController@update');

    Route::post('/changeAvatar', 'Api\HomeController@changeAvatar');

    Route::get('/questionLists', 'Api\QuestionListController@index');

    Route::post('/questionLists', 'Api\QuestionListController@store');

    Route::patch('/questionList/{id}', 'Api\QuestionListController@update');

    Route::delete('/questionList/{id}', 'Api\QuestionListController@delete');

    Route::get('/users', 'Api\UserController@index');

    Route::get('/user/{id}', 'Api\UserController@show');

    Route::get('/questionList/questions', 'Api\QuestionController@index');

    Route::post('/questionList/{id}/question', 'Api\QuestionController@store');

    Route::patch('/questionList/{questionList_id}/question/{id}', 'Api\QuestionController@update');

    Route::delete('/questionList/{questionList_id}/question/{id}', 'Api\QuestionController@delete');   
    
    Route::post('/question/{question_id}/option', 'Api\OptionController@store');

    Route::get('/options', 'Api\OptionController@index');

    Route::patch('/question/{question_id}/options', 'Api\OptionController@update');
});
