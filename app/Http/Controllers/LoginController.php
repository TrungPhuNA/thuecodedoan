<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LoginController extends Controller
{
    /**
     * @return
     * form login admin
     */
    public function login(Request $request)
    {
//        dd(        $request->header('User-Agent'));
        return view('auth.login');
    }

    /**
     * @return \Illuminate\Http\RedirectResponse
     * Đăng nhập
     */
    public function postLogin(Request $request)
    {
        $credentials = $request->only('email', 'password');
        if (\Auth::guard('admins')->attempt($credentials)) {
            return redirect()->route('get.project');
        }

        return redirect()->back();
    }

    /**
     * @return \Illuminate\Http\RedirectResponse
     * Đăng xuất
     */
    public function logout()
    {
        \Auth::logout();
        return redirect()->route('get.login');
    }
}
