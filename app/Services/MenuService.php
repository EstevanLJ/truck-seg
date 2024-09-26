<?php

namespace App\Services;

use Illuminate\Support\Facades\Auth;
use Laratrust\LaratrustFacade as Laratrust;

class MenuService
{
    public static function getMenus()
    {
        $appMenus = config('menu');
        $menus = [];
        $user = Auth::user();

        if (!$user) {
            return [];
        }

        foreach ($appMenus as $menu) {
            if (!isset($menu['permission']) || Laratrust::isAbleTo($menu['permission'])) {
                if (isset($menu['submenu'])) {

                    $submenus = [];
                    foreach ($menu['submenu'] as $submenu) {
                        if (isset($submenu['permission']) ? Laratrust::isAbleTo($submenu['permission']) : true) {
                            $submenus[] = $submenu;
                        }
                    }

                    if (sizeof($submenus) > 0) {
                        $menu['submenu'] = $submenus;
                        $menus[] = $menu;
                    }


                } else {
                    $menus[] = $menu;
                }
            }
        }

        return $menus;
    }
}
