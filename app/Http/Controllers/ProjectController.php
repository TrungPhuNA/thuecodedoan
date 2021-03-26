<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::orderByDesc('id')
            ->paginate(10);

        $viewData = [
            'projects' => $projects
        ];

        return view('project.index', $viewData);
    }

    public function create()
    {
        return view('project.create');
    }

    public function store(Request $request)
    {
        $data = $request->except('_token');
        $data['p_slug'] = Str::slug($request->p_name);
        $data['created_at'] = Carbon::now();
        Project::create($data);
        return redirect()->route('get.project');
    }

    public function edit($id)
    {
        $project = Project::find($id);
        return view('project.update', compact('project'));
    }

    public function update(Request $request, $id)
    {
        $data = $request->except('_token');
        $data['p_slug'] = Str::slug($request->p_name);
        $data['updated_at'] = Carbon::now();
        Project::find($id)->update($data);
        return redirect()->route('get.project');
    }

    public function delete($id)
    {
        Project::find($id)->delete();
        return redirect()->route('get.project');
    }
}
