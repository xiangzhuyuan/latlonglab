require 'fit'
require 'byebug'


fit_file = Fit.load_file(ARGV[0])

byebug
fit_file.records

records = fit_file.records.select { |r| r.content.record_type != :definition }.map { |r| r.content }
