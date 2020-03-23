<?php

use Illuminate\Database\Seeder;

class OptionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('options')->insert([
            ['id' => '1',
             'question_id' => '1',            
             'content' => 'option 1',
             'created_at' => date('Y-m-d H:i:s'),
             'updated_at' => date('Y-m-d H:i:s'),
            ],
            ['id' => '2',
             'question_id' => '1',            
             'content' => 'option 2',
             'created_at' => date('Y-m-d H:i:s'),
             'updated_at' => date('Y-m-d H:i:s'),
            ],
            ['id' => '3',
             'question_id' => '1',            
             'content' => 'option 3',
             'created_at' => date('Y-m-d H:i:s'),
             'updated_at' => date('Y-m-d H:i:s'),
            ],
        ]);
    }
}
