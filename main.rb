require 'nokogiri'
require 'pry'
now = Time.now

TARGET = 8000

# binding.pry
@doc   = Nokogiri::XML(File.open(ARGV[0]))

file_type = ARGV[0].split(".")[-1]

case file_type
when 'kml'
  all_coordinates_str = @doc.search("coordinates").children.to_s

  all_coordinates = all_coordinates_str.split("\n")

  all_coordinates.each_with_index do |value, index|
    all_coordinates.delete(value) if index%2==0
  end if all_coordinates.length > TARGET
  puts all_coordinates.length

  @doc.search("coordinates").first.children = all_coordinates.join("\n")

  puts "write back to #{ARGV[0] + "_new.kml"}"
  puts Time.now-now
  File.write(ARGV[0] + "_new.xml", @doc.to_xml)
when 'gpx'
  all_trkpt = @doc.search("trkpt")

  all_trkpt.each_with_index do |value, index|
    value.remove if index%2==0
  end if all_trkpt.length > TARGET
  puts all_trkpt.length

  puts "write back to #{ARGV[0] + "_new.gpx"}"
  puts Time.now-now
  File.write(ARGV[0] + "_new.gpx", @doc.to_xml)
else
  puts "wrong file type, only gpx&kml!"
end


