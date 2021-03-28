<form action="" method="POST">
    @csrf
    <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item">
            <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Thông tin</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Mô tả yêu cầu</a>
        </li>
    </ul>
    <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
            <div class="row">
                <div class="col-sm-6">
                    <div class="card mt-2">
                        <div class="card-body">
                            <h6 class="card-subtitle mb-2 text-muted">Thông tin khách hàng</h6>
                            <div class="row">
                                <div class="col-sm-4">
                                    <label for="basic-url">Họ tên <span class="text-danger">(*)</span></label>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1"><i class="fa fa-user"></i></span>
                                        </div>
                                        <input type="text" name="p_fullname" class="form-control" value="{{ $project->p_fullname ?? '' }}" placeholder="Họ tên ">
                                    </div>
                                </div>
                                <div class="col-sm-8">
                                    <label for="basic-url">Link facebook <span class="text-danger">(*)</span></label>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="fa fa-facebook"></i></span>
                                        </div>
                                        <input type="text" class="form-control" name="p_facebook" value="{{ $project->p_facebook ?? '' }}" placeholder="Link facebook nếu có ">
                                    </div>
                                </div>
                                <div class="col-sm-12">
                                    <label for="basic-url">Trường đại học</label>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="fa fa-facebook"></i></span>
                                        </div>
                                        <input type="text" class="form-control" name="p_university" value="{{ $project->p_university ?? '' }}" placeholder="Trường đại học ">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="card mt-2">
                        <div class="card-body">
                            <h6 class="card-subtitle mb-2 text-muted">Thông tin đồ án</h6>
                            <div class="row">
                                <div class="col-sm-12">
                                    <label for="basic-url">Tên đồ án <span class="text-danger">(*)</span></label>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1"><i class="fa fa-terminal"></i></span>
                                        </div>
                                        <input type="text" name="p_name" class="form-control" value="{{ $project->p_name ?? '' }}" placeholder="Tên đồ án">
                                    </div>
                                </div>
                                <div class="col-sm-3">
                                    <label for="basic-url">Ngôn ngữ code <span class="text-danger">(*)</span></label>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="fa fa-code"></i></span>
                                        </div>
                                        <input type="text" class="form-control" name="p_language_code" value="{{ $project->p_language_code ?? '' }}" placeholder="C#, PHP ">
                                    </div>
                                </div>
                                <div class="col-sm-3">
                                    <label for="basic-url">CSDL <span class="text-danger">(*)</span></label>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="fa fa-database"></i></span>
                                        </div>
                                        <input type="text" class="form-control" name="p_csdl" value="{{ $project->p_csdl ?? '' }}" placeholder="Mysql, Sql serve ">
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <label for="basic-url">Giá <span class="text-danger">(*)</span></label>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">$</span>
                                        </div>
                                        <input type="text" name="p_price" placeholder="3.000.000" value="{{ $project->p_price ?? '' }}" class="form-control" aria-label="Amount (to the nearest dollar)">
                                        <div class="input-group-append">
                                            <span class="input-group-text">VNĐ</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="card mt-2">
                        <div class="card-body">
                            <h6 class="card-subtitle mb-2 text-muted">Thời gian</h6>
                            <div class="row">
                                <div class="col-sm-6">
                                    <label for="basic-url">Ngày bắt đầu <span class="text-danger">(*)</span></label>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1"><i class="fa fa-clock-o"></i></span>
                                        </div>
                                        <input type="date" name="p_time_start" value="{{ $project->p_time_start ?? '' }}" class="form-control" placeholder="">
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <label for="basic-url">Ngày kết thúc <span class="text-danger">(*)</span></label>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="fa fa-clock-o"></i></span>
                                        </div>
                                        <input type="date" class="form-control" value="{{ $project->p_time_stop ?? '' }}" name="p_time_stop" placeholder="Link facebook nếu có ">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="card mt-2">
                        <div class="card-body">
                            <h6 class="card-subtitle mb-2 text-muted">Dữ liệu</h6>
                            <div class="row">
                                <div class="col-sm-6">
                                    <label for="basic-url">Báo cáo <span class="text-danger">(*)</span></label>
                                    <div class="input-group mb-3">
                                        <div class="custom-file">
                                            <input type="file" class="custom-file-input" name="p_document">
                                            <label class="custom-file-label" for="validatedCustomFile">Chọn file ...</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <label for="basic-url">Link website <span class="text-danger">(*)</span></label>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="fa fa-clock-o"></i></span>
                                        </div>
                                        <input type="text" class="form-control" name="p_website" value="{{ $project->p_website ?? '' }}" placeholder="Link website">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="card mt-2">
                        <div class="card-body">
                            <h6 class="card-subtitle mb-2 text-muted">Thông tin người bán</h6>
                            <div class="row">
                                <div class="col-sm-4">
                                    <label for="basic-url">Họ tên <span class="text-danger">(*)</span></label>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1"><i class="fa fa-user"></i></span>
                                        </div>
                                        <input type="text" name="p_name_pay" class="form-control" value="{{ $project->p_name_pay ?? '' }}" placeholder="Họ tên ">
                                    </div>
                                </div>
                                <div class="col-sm-8">
                                    <label for="basic-url">Link facebook <span class="text-danger">(*)</span></label>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="fa fa-facebook"></i></span>
                                        </div>
                                        <input type="text" class="form-control" name="p_face_pay" value="{{ $project->p_face_pay ?? '' }}" placeholder="Link facebook nếu có ">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
            <div class="row">
                <div class="col-sm-8">
                    <div class="card mt-2">
                        <div class="card-body">
                            <h6 class="card-subtitle mb-2 text-muted">Mô tả yêu cầu và tính năng</h6>
                            <label for="basic-url">Tóm tắt mô tả yc (Không quá 300 từ) <span class="text-danger">(*)</span></label>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">Mô tả</span>
                                </div>
                                <textarea class="form-control" aria-label="With textarea" name="p_required">{{ $project->p_required ?? "" }}</textarea>
                            </div>

                            <div class="input-group mb-3">
                                <textarea name="p_content" id="content" cols="30" rows="10">{!! $project->p_content ?? '' !!}</textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <button type="submit" class="btn btn-success mt-3 text-center d-block">Lưu thông tin <i class="fa fa-save"></i></button>
</form>

<script src="{{ asset('ckeditor/ckeditor.js') }}"></script>
<script>
    var options = {
        filebrowserImageBrowseUrl: '/laravel-filemanager?type=Images',
        filebrowserImageUploadUrl: '/laravel-filemanager/upload?type=Images&_token=',
        filebrowserBrowseUrl: '/laravel-filemanager?type=Files',
        filebrowserUploadUrl: '/laravel-filemanager/upload?type=Files&_token=',
        language: 'vi',
        uiColor: '#9AB8F3',
        height : 300,
        codeSnippet_theme: 'monokai_sublime',
    };
    CKEDITOR.replace( 'content',options);
</script>
