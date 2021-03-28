<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('login','LoginController@login')->name('get.login');
Route::get('logout','LoginController@logout')->name('get.logout');
Route::post('login','LoginController@postLogin');

Route::prefix('doan')->group(function (){
   Route::get('','ProjectController@index')->name('get.project');
   Route::get('danh-sach','ProjectController@index')->name('get.project')
       ->middleware('checkLoginAdmin');
   Route::get('tao-moi','ProjectController@create')
       ->name('get.project.create')->middleware('checkLoginAdmin');
   Route::post('tao-moi','ProjectController@store');
    Route::get('cap-nhat/{id}','ProjectController@edit')
        ->middleware('checkLoginAdmin')
        ->name('get.project.update');
    Route::post('cap-nhat/{id}','ProjectController@update')->middleware('checkLoginAdmin');
    Route::get('xoa/{id}','ProjectController@delete') ->middleware('checkLoginAdmin')->name('get.project.delete');
});
