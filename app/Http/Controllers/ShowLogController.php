<?php

namespace App\Http\Controllers;

use App\Models\LogSystem;
use Illuminate\Http\Request;

class ShowLogController extends Controller
{
    public function index()
    {
        $logs = LogSystem::orderByDesc('id')
            ->paginate(20);

        $viewData = [
            'logs' => $logs
        ];

        return view('log.index', $viewData);
    }

    public function delete ($id)
    {
        $log = LogSystem::find($id)->delete();
        return redirect()->back();
    }
}
