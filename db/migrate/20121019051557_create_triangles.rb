class CreateTriangles < ActiveRecord::Migration
  def change
    create_table :triangles do |t|
      t.text :name
      t.integer :x1
      t.integer :y1
      t.integer :x2
      t.integer :y2
      t.integer :x3
      t.integer :y3
      t.integer :stage
      t.boolean :answer
      t.timestamps
    end
  end
end
