class TriangleValidator < ActiveModel::EachValidator
	def validate_each(record, attribute, value)
		true
	end
end