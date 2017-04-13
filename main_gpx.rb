require 'nokogiri'
require 'byebug'
now = Time.now

TARGET = 8000

@doc = Nokogiri::XML(File.open(ARGV[0]))
all_trkpt = @doc.search("trkpt")

all_trkpt.each_with_index do |value, index|
  value.remove if index%2==0
end if all_trkpt.length > TARGET
puts all_trkpt.length

puts "write back to #{ARGV[0] + "_new.gpx"}"
puts Time.now-now
File.write(ARGV[0] + "_new.gpx", @doc.to_xml)

