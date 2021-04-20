<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" type="image/png" href="{{ asset('favicon.png') }}">
    <title>@yield('title','Đồ án')</title>
    <link rel="canonical" href="https://getbootstrap.com/docs/4.0/examples/navbar-fixed/">
    <!-- Bootstrap core CSS -->
    <link href="https://getbootstrap.com/docs/4.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Custom styles for this template -->
    <link rel="icon" href="{{ asset('favicon.png') }}" type="image/x-icon">
    <link href="https://getbootstrap.com/docs/4.0/examples/navbar-fixed/navbar-top-fixed.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
    <meta name="robots" content="noindex, nofollow">
</head>
<body>
<nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <a class="navbar-brand" href="/">Ql đồ án</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
            aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav mr-auto">
            @foreach(config('nav.admin') as $item)
                <li class="nav-item {{ \Request::route()->getName() == $item['route'] ? 'active' : '' }}">
                    <a class="nav-link" href="{{ route($item['route']) }}">{{ $item['name'] }}</a>
                </li>
            @endforeach
        </ul>
        <ul class="navbar-nav flex-row ml-md-auto d-none d-md-flex">
            <li class="nav-item dropdown">
                <a class="nav-item nav-link dropdown-toggle mr-md-2" style="padding: 0" href="#" id="bd-versions"
                   data-toggle="dropdown"
                   aria-haspopup="true" aria-expanded="false">
                    <img src="https://www.w3schools.com/howto/img_avatar2.png" alt=""
                         style="width: 40px;height: 40px;border-radius: 50%">
                </a>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="bd-versions">
                    <a class="dropdown-item" href="">Cập nhật
                        thông tin</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="">Thoát</a>
                </div>
            </li>
        </ul>
    </div>
</nav>

@yield('content')
<!-- Bootstrap core JavaScript

    ================================================== -->
<!-- Placed at the end of the document so the pages load faster -->
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
        integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
        crossorigin="anonymous"></script>
<script>window.jQuery || document.write('<script src="../../assets/js/vendor/jquery-slim.min.js"><\/script>')</script>
<script src="https://getbootstrap.com/docs/4.0/assets/js/vendor/popper.min.js"></script>
<script src="https://getbootstrap.com/docs/4.0/dist/js/bootstrap.min.js"></script>
@yield('script')


<script>
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })

</script>
</body>
</html>
