@extends('layouts.app')
@section('title','Cập nhật đồ án')
@section('content')
    <div class="container-fluid">
        <h4>Cập nhật đồ án <a href="{{ route('get.project') }}" class="btn btn-sm btn-danger pull-right">Về danh sách <i class="fa fa-reply"></i></a></h4>
        @include('project.form')
    </div>
@endsection
