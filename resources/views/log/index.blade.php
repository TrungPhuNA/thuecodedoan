@extends('layouts.app')
@section('title','Danh sách đồ án')
@section('content')
    <div class="container-fluid">
        <h4>Danh sách logs</h4>
        <div class="table-responsive">
            <table class="table mt-3">
                <caption>List of users</caption>
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">AppName</th>
                    <th scope="col">Line</th>
                    <th scope="col">File</th>
                    <th scope="col">Create</th>
                    <th scope="col">#</th>
                </tr>
                </thead>
                <tbody>
                @foreach($logs as $key => $item)
                    <tr>
                        <th scope="row">{{ $key + 1 }}</th>
                        <td>{{ $item->ls_app_name }}</td>
                        <td>{{ $item->ls_line }}</td>
                        <td>{{ $item->ls_file }}</td>
                        <td>{{ $item->created_at }}</td>
                        <td>
                            <a href="{{ route('log.show', $item->id) }}" target="_blank" class="btn btn-sm  btn-info"><i class="fa fa-eye"></i></a>
                            <a href="{{ route('get.show_log.delete', $item->id) }}" class="btn btn-sm  btn-danger"><i class="fa fa-trash"></i></a>
                        </td>
                    </tr>
                </tbody>
                @endforeach
            </table>
            {!! $logs->links() !!}
        </div>
    </div>
@endsection
