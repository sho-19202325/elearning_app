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

Route::middleware('auth:api')->get('/user', 'Api\HomeController@index');

Route::post('/user', 'Api\UserController@store');

Route::post('/login', 'Api\AuthController@login');

Route::middleware('auth:api')->get('/questionLists', 'Api\QuestionListController@index');

Route::middleware('auth:api')->post('/questionLists', 'Api\QuestionListController@store');

Route::middleware('auth:api')->patch('/questionList/{id}', 'Api\QuestionListController@update');

Route::middleware('auth:api')->delete('/questionList/{id}', 'Api\QuestionListController@delete');

Route::middleware('auth:api')->get('/users', 'Api\UserController@index');

Route::middleware('auth:api')->patch('/update', 'Api\HomeController@update');

Route::middleware('auth:api')->post('/changeAvatar', 'Api\HomeController@changeAvatar');

Route::middleware('auth:api')->get('/user/{id}', 'Api\UserController@show');