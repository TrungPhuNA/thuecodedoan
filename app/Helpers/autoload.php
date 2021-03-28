<?php
/**
 * Created by PhpStorm .
 * User: trungphuna .
 * Date: 3/27/21 .
 * Time: 10:21 AM .
 */


if( !function_exists('get_data_user'))
{
    function get_data_user($guest, $column = 'id')
    {
        return Auth::guard($guest)->user() ? Auth::guard($guest)->user()->$column : null;
    }
}

if (!function_exists('check_time_class')) {
    function check_time_class($start, $stop)
    : bool
    {
        $check = \Carbon\Carbon::now()->between($start,$stop);
        return $check;
    }
}

