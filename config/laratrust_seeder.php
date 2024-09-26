<?php

return [
    /**
     * Control if the seeder should create a user per role while seeding the data.
     */
    'create_users' => false,

    /**
     * Control if all the laratrust tables should be truncated before running the seeder.
     */
    'truncate_tables' => true,

    'roles_structure' => [
        'administrator' => [
            'users' => 'c,r,u,d',
            'roles' => 'c,r,u,d',
            'permissions' => 'c,r,u,d',

            'countries' => 'c,r,u,d',
            'provinces' => 'c,r,u,d',
            'cities' => 'c,r,u,d',
            'pipelines' => 'c,r,u,d',
            'deal-lost-reasons' => 'c,r,u,d',
            'insurance-companies' => 'c,r,u,d',
            'activity-types' => 'c,r,u,d',
            'quotation-types' => 'c,r,u,d',

            'goods-types' => 'r',
            'trackers-types' => 'r',
            'sensors-types' => 'r',
            'actuatores-types' => 'r',
            'vehicle-types' => 'r',
            'transportation-form-responses' => 'c,r,u,d',

            'people' => 'c,r,u,d',
            'documents' => 'c,r,u,d',
            'deals' => 'c,r,u,d',
            'quotations' => 'c,r,u,d',
            'activities' => 'c,r,u,d',

            'profile' => 'r,u'
        ],
        'manager' => [
            'users' => 'c,r,u,d',
            'roles' => 'c,r,u,d',
            'permissions' => 'r',

            'countries' => 'c,r,u,d',
            'provinces' => 'c,r,u,d',
            'cities' => 'c,r,u,d',
            'pipelines' => 'c,r,u,d',
            'deal-lost-reasons' => 'c,r,u,d',
            'insurance-companies' => 'c,r,u,d',
            'activity-types' => 'c,r,u,d',
            'quotation-types' => 'c,r,u,d',

            'goods-types' => 'r',
            'trackers-types' => 'r',
            'sensors-types' => 'r',
            'actuatores-types' => 'r',
            'vehicle-types' => 'r',
            'transportation-form-responses' => 'c,r,u,d',

            'people' => 'c,r,u,d',
            'documents' => 'c,r,u,d',
            'deals' => 'c,r,u,d',
            'quotations' => 'c,r,u,d',
            'activities' => 'c,r,u,d',

            'profile' => 'r,u',
        ],
        'quoter' => [
            'countries' => 'r',
            'provinces' => 'r',
            'cities' => 'r',
            'pipelines' => 'r',
            'deal-lost-reasons' => 'r',
            'insurance-companies' => 'r',
            'activity-types' => 'r',
            'quotation-types' => 'r',

            'goods-types' => 'r',
            'trackers-types' => 'r',
            'sensors-types' => 'r',
            'actuatores-types' => 'r',
            'vehicle-types' => 'r',
            'transportation-form-responses' => 'c,r,u,d',

            'people' => 'c,r,u,d',
            'documents' => 'c,r,u,d',
            'deals' => 'r,u',
            'quotations' => 'c,r,u,d',
            'activities' => 'c,r,u,d',

            'profile' => 'r,u',
        ],
        'seller' => [
            'countries' => 'r',
            'provinces' => 'r',
            'cities' => 'r',
            'pipelines' => 'r',
            'deal-lost-reasons' => 'r',
            'insurance-companies' => 'r',
            'activity-types' => 'r',

            'goods-types' => 'r',
            'trackers-types' => 'r',
            'sensors-types' => 'r',
            'actuatores-types' => 'r',
            'vehicle-types' => 'r',
            'transportation-form-responses' => 'c,r,u,d',

            'people' => 'c,r,u,d',
            'documents' => 'c,r,u,d',
            'deals' => 'c,r,u,d',
            'activities' => 'c,r,u,d',

            'profile' => 'r,u',
        ]
    ],

    'permissions_map' => [
        'c' => 'create',
        'r' => 'read',
        'u' => 'update',
        'd' => 'delete'
    ]
];
