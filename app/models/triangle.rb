class TriangleValidator < ActiveModel::Validator
	def validate(record)
		p0c = Math.sqrt((record.x2 - record.x1)**2 + (record.y2-record.y1)**2);
		p1c = Math.sqrt((record.x2 - record.x3)**2 + (record.y2-record.y3)**2);
		p0p1 = Math.sqrt((record.x3 - record.x1)**2 + (record.y3-record.y1)**2);

		if record.stage == 1 
			if (Math.acos(((p1c*p1c+p0c*p0c-p0p1*p0p1))/(2*p1c*p0c)) * (180 / Math.atan2(0.0, -1.0))).round(0) != 70
				record.errors.add :base, "B is wrong"
			end		
			if (Math.sqrt(((record.y1 - record.y2)**2) + (record.x1 - record.x2)**2)/50).round(0) != 8.0
				record.errors.add :base, "AB is wrong"
			end
			if (Math.sqrt(((record.y2 - record.y3)**2) + (record.x2 - record.x3)**2)/50).round(0) != 5.0
				record.errors.add :base, "BC is wrong"
			end
		else

			if (Math.acos(((p1c*p1c+p0c*p0c-p0p1*p0p1))/(2*p1c*p0c)) * (180 / 3.14159)).round(0) != 30
				record.errors.add :base, "B is wrong"
			end		

			p0c = Math.sqrt((record.x1 - record.x2)**2 + (record.y1-record.y2)**2);
			p1c = Math.sqrt((record.x1 - record.x3)**2 + (record.y1-record.y3)**2);
			p0p1 = Math.sqrt((record.x3 - record.x2)**2 + (record.y3-record.y2)**2);

			if (Math.acos(((p1c*p1c+p0c*p0c-p0p1*p0p1))/(2*p1c*p0c)) * (180 / 3.14159)).round(0) != 70
				record.errors.add :base, "A is wrong"
			end	


			p0c = Math.sqrt((record.x3 - record.x1)**2 + (record.y3-record.y1)**2);
			p1c = Math.sqrt((record.x3 - record.x2)**2 + (record.y3-record.y2)**2);
			p0p1 = Math.sqrt((record.x2 - record.x1)**2 + (record.y2-record.y1)**2);

			if (Math.acos(((p1c*p1c+p0c*p0c-p0p1*p0p1))/(2*p1c*p0c)) * (180 / 3.14159)).round(0) != 80
				record.errors.add :base, "C is wrong"
			end	
		end
	end
end

class Triangle < ActiveRecord::Base
  attr_accessible :name, :stage, :x1, :x2, :x3, :y1, :y2, :y3, :answer
  validates_with TriangleValidator
end
