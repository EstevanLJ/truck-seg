<?php

return [
    [
        'text' => 'Deals',
        'icon' => 'far fa-briefcase',
        'url'  => '/deals',
        'permission' => 'deals-read',
    ],
    [
        'text' => 'Clients',
        'icon' => 'far fa-address-card',
        'url'  => '/clients',
        'permission' => 'people-read',
    ],
    [
        'text' => 'Quotations',
        'icon' => 'far fa-file-invoice-dollar',
        'url'  => '/quotations',
        'permission' => 'quotations-read',
    ],
    [
        'text' => 'Activities',
        'icon' => 'far fa-pennant',
        'url'  => '/activities',
    ],
    [
        'text' => 'Configurations',
        'icon' => 'far fa-cog',
        'submenu' => [
            [
                'text' => 'Insurance Companies',
                'icon' => 'far fa-key',
                'permission' => 'insurance-companies-read',
                'url'  => '/insurance-companies',
            ],
            [
                'text' => 'Reasons',
                'icon' => 'far fa-question',
                'permission' => 'deal-lost-reasons-read',
                'url'  => '/deal-lost-reasons',
            ],
            [
                'text' => 'Activity Types',
                'icon' => 'far fa-pennant',
                'permission' => 'activity-types-read',
                'url'  => '/activity-types',
            ],
            [
                'text' => 'Quotation Types',
                'icon' => 'far fa-file-invoice-dollar',
                'permission' => 'quotation-types-read',
                'url'  => '/quotation-types',
            ],
            [
                'text' => 'Users',
                'icon' => 'far fa-users',
                'permission' => 'users-read',
                'url'  => '/users',
            ],
            [
                'text' => 'Pipelines',
                'icon' => 'far fa-bezier-curve',
                'permission' => 'pipelines-read',
                'url'  => '/pipelines',
            ],
            [
                'text' => 'Logs',
                'icon' => 'far fa-file',
                'permission' => 'logs-read',
                'url'  => '/logs',
            ],
            [
                'text' => 'Permissions',
                'icon' => 'far fa-lock',
                'permission' => 'permissions-read',
                'url'  => '/permissions',
            ],
            [
                'text' => 'Groups',
                'icon' => 'far fa-users',
                'permission' => 'roles-read',
                'url'  => '/roles',
            ],
        ]
    ],

];
