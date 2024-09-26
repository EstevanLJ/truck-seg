<?php

namespace App\Http\Controllers;

use App\Services\MenuService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{

    public function me(Request $request)
    {
        $user = Auth::user();
        $user->load('roles');
        $menus = MenuService::getMenus();

        return [
            'user' => $user,
            'permissions' => $user->allPermissions(),
            'menus' => $menus
        ];
    }

}
