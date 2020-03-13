<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            ['id' => '1',
             'name' => 'admin user',
             'email' => 'admin@admin.com',
             'password' => Hash::make('admin'),
             'isAdmin' => true,
             'created_at' => date('Y-m-d H:i:s'),
             'updated_at' => date('Y-m-d H:i:s'),
            ],

            ['id' => '2',
             'name' => 'nonadmin user',
             'email' => 'nonadmin@nonadmin.com',
             'password' => Hash::make('nonadmin'),
             'isAdmin' => false,
             'created_at' => date('Y-m-d H:i:s'),
             'updated_at' => date('Y-m-d H:i:s'),
            ]
        ]);

        factory(App\User::class, 30)->create();
    }
}
