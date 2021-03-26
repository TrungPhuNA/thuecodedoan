@extends('layouts.app')
@section('title','Danh sách đồ án')
@section('content')
    <style>
        p {
            margin-bottom: 5px;
        }
    </style>
    <div class="container-fluid">
        <h4>Danh sách đồ án CNTT <a href="{{ route('get.project.create') }}" class="btn btn-sm btn-primary pull-right">Tạo mới <i class="fa fa-plus-circle"></i></a></h4>
        <table class="table mt-3">
            <caption>List of users</caption>
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Khách hàng</th>
                <th scope="col">Tên đồ án</th>
                <th scope="col">Ngôn ngữ</th>
                <th scope="col">Số tiền</th>
                <th scope="col">Ngày nhận</th>
                <th scope="col">Ngày kết thúc</th>
                <th scope="col">Dữ liệu</th>
                <th scope="col">#</th>
            </tr>
            </thead>
            <tbody>
                @foreach($projects as $key => $item)
                    <tr>
                        <th scope="row">{{ $key + 1  }}</th>
                        <td>
                            <div class="info">
                                <p><span>Họ tên: </span> <span>{{ $item->p_fullname }}</span></p>
                                <p><span>Facebook: </span> <a href="" title="" target="_blank">Click my</a></p>
                            </div>
                        </td>
                        <td>
                            <a href="">{{ $item->p_name }}</a>
                            <p><a href="">Báo cáo <i class="fa fa-external-link"></i></a></p>
                        </td>
                        <td><span class="badge badge-primary">{{ $item->p_language_code }}</span></td>
                        <td>
                            <p><span>0 vnđ</span> / <span><b>{{ number_format($item->p_price,0,',','.') }} vnđ</b></span></p>
                        </td>
                        <td>
                            <p><i class="fa fa-clock-o"></i> {{ $item->p_time_start }}</p>
                        </td>
                        <td>
                            <p><i class="fa fa-clock-o"></i> {{ $item->p_time_stop }} </p>
                        </td>
                        <td>
                            <p><a href="" target="_blank"><i class="fa fa-internet-explorer text-primary"></i> #</a></p>
                            <p><a href="" target="_blank"><i class="fa fa-youtube text-danger"></i> Link</a></p>
                            <p><a href="" target="_blank"><i class="fa fa-file-text text-info"></i> Y/c</a></p>
                        </td>
                        <td>
                            <a href="{{ route('get.project.update', $item->id) }}" class="btn btn-sm  btn-info"><i class="fa fa-pencil-square-o"></i></a>
                            <a href="{{ route('get.project.delete', $item->id) }}" class="btn btn-sm  btn-danger"><i class="fa fa-trash"></i></a>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
@endsection
