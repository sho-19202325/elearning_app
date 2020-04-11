<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="h-100">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" type="text/css">

    <!-- Styles -->
    @if(app('env') == 'production')
        <script src="{{ secure_asset('js/app.js') }}" defer></script>    
        <link href="{{ secure_asset('css/app.css') }}" rel="stylesheet">
        <link rel="stylesheet" href="{{ secure_asset('css/common.css') }}">
    @else
        <script src="{{ asset('js/app.js') }}" defer></script>    
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">
        <link rel="stylesheet" href="{{ asset('css/common.css') }}">
    @endif  

    <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
</head>
<body class="h-100">
    <main class="h-100">
        <div id="index" class="h-100"></div>
        @if(app('env') == 'production')
            <script src={{ secure_asset('js/app.js') }}></script>
        @else
            <script src={{ asset('js/app.js') }}></script>
        @endif  
    </main>
</body>
</html>
