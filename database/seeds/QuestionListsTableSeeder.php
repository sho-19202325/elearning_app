<?php

use Illuminate\Database\Seeder;

class QuestionListsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('question_lists')->insert([
            ['id' => '1',
             'user_id' => '1',            
             'title' => 'sample list 1',
             'description' => 'this is sample list 1',
             'created_at' => date('Y-m-d H:i:s'),
             'updated_at' => date('Y-m-d H:i:s'),
            ],
            ['id' => '2',
            'user_id' => '1',
            'title' => 'sample list 2',
            'description' => 'this is sample list 2',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
            ],
            ['id' => '3',
            'user_id' => '1',
            'title' => 'sample list 3',
            'description' => 'this is sample list 3',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
            ]
        ]);
    }
}
