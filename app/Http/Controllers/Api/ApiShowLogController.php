<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\LogSystem;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ApiShowLogController extends Controller
{
    public function index()
    {
        $logs = LogSystem::all();
        return response()->json([
            'status' => 200,
            'data'   => $logs
        ]);
    }

    public function store(Request $request)
    {
        try {
            $data = [
                'ls_ip'       => $request->ip,
                'ls_app_name' => $request->app_name,
                'ls_line'     => $request->line,
                'ls_file'     => $request->file,
                'ls_content'  => $request->content_text,
                'ls_browser'  => $request->browser,
                'created_at'  => Carbon::now()
            ];

            $log = LogSystem::create($data);
            if ($log) {
                return response()->json([
                    'status' => 200,
                    'data'   => $log
                ]);
            }
            return response()->json([
                'status'  => 401,
                'message' => 'Thêm mới thất bại'
            ]);
        } catch (\Exception $exception) {
            Log::error("File: " . $exception->getFile() . " Line: " . $exception->getLine() . " : Content : " . $exception->getMessage());
            return response()->json([
                'status'  => 200,
                'data'    => [],
                'message' => $exception->getMessage()
            ]);
        }
    }

    public function show($id)
    {
        $log = LogSystem::find($id);
        return response()->json([
            'status' => 200,
            'data'   => $log
        ]);
    }
}
